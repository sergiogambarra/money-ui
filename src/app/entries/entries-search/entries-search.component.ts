import { AuthService } from './../../security/auth.service';
import { EntryService } from './../entry.service';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { EntryFilter } from '../entry.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-entries-search',
  templateUrl: './entries-search.component.html',
  styles: [
  ]
})
export class EntriesSearchComponent implements OnInit {

  totalRegistros = 0;
  filter = new EntryFilter();
  entry = [];
  @ViewChild('tabela') grid;

  constructor(
      private entryService: EntryService,
      private auth: AuthService,
      private notifyService: NotificationService,
      private confirmation: ConfirmationService,
      private erroHandler: ErrorHandlerService,
      private title: Title,
    ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de Lançamentos');
  }

  pesquisar(pagina = 0) {
    this.filter.page = pagina;

    this.entryService.pesquisar(this.filter)
      .then(result => {
        this.totalRegistros = result.total;
        this.entry = result.entry;
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(entry: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      header: 'Confirmação',
      icon: 'fa fa-question-circle',
      acceptLabel: 'Sim',
      acceptIcon: 'fa fa-check',
      rejectLabel: 'Não',
      rejectIcon: 'fa fa-times',
      accept: () => this.excluir(entry)
    });

  }


  excluir(entry: any) {
    this.entryService.excluir(entry.id)
      .then(() => {
        this.pesquisar();
        this.grid.first = 0;
        this.notifyService.showSuccess('Lançamento excluído com sucesso!', 'Notification');
      })
      .catch(erro => this.erroHandler.handle(erro));

  }


}
