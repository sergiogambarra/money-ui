import { ErrorHandlerService } from './../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';

import { PersonFilter, PersonService } from '../person.service';
import { Component, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-people-search',
  templateUrl: './people-search.component.html',
  styleUrls: ['./people-search.component.css']
})
export class PeopleSearchComponent {

  totalRegistros = 0;
  filter = new PersonFilter();
  person = [];
  @ViewChild('tabela') grid;


  constructor(
    private personService: PersonService,
    private notifyService: NotificationService,
    private confirmation: ConfirmationService,
    private erroHandler: ErrorHandlerService,
    ) {}

  pesquisar(pagina = 0) {
    this.filter.page = pagina;

    this.personService.pesquisar(this.filter)
      .then(result => {
        this.totalRegistros = result.total;
        this.person = result.person;
      });
  }

  confirmarExclusao(person: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      header: 'Confirmação',
      icon: 'fa fa-question-circle',
      acceptLabel: 'Sim',
      acceptIcon: 'fa fa-check',
      rejectLabel: 'Não',
      rejectIcon: 'fa fa-times',
      accept: () => this.excluir(person)
    });

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  excluir(person: any) {
    this.personService.excluir(person.id)
      .then(() => {
        this.pesquisar();
        this.grid.first = 0;
        this.notifyService.showSuccess('Usuario excluído com sucesso!', 'Notification');
      })
      .catch(erro => this.erroHandler.handle(erro));

  }

  ativarInativar (person: any) {
    let msg;
    if (person.active){
      msg = 'desativado';
    } else {
      msg = 'ativado';
    }
    this.personService.ativarInativar(person.id, person.active)
      .then(() => {
        this.pesquisar();
        console.log(this.grid.first);
        // this.grid.first = 0;
        this.notifyService.showSuccess(`Usuario ${msg} com sucesso!`, 'Notification');
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

}
