import { ToastrService } from 'ngx-toastr';
import { EntryService } from './../entry.service';
import { Entry } from './../../core/model';
import { PersonService } from './../../people/person.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoryService } from './../../categories/category.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  categories = [];
  people = [];
  entry = new Entry();

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'},
  ];



  constructor(
    private categoryService: CategoryService,
    private personService: PersonService,
    private entryService: EntryService,
    private toastr: ToastrService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    ) { }

  ngOnInit() {
    const idEntry = this.route.snapshot.params.id;

    this.title.setTitle('Novo Lançamento');

    if (idEntry) {
      this.loadEntry(idEntry);
    }
    this.loadCategories();
    this.loadPeople();
  }

  public get editando(): boolean {
    return Boolean(this.entry.id);
  }

  save(form: FormControl) {
    if (this.editando) {
      this.updateEntry(form);
    } else {
      this.add(form);
    }
  }

  add(form: FormControl) {
    this.entryService.add(this.entry)
    .then(entryAdded => {
      this.toastr.success('Lançamento adicionado com sucesso!');
      this.router.navigate(['/lancamentos', entryAdded.id]);

    })
    .catch(error => this.errorHandler.handle(error));
  }
  updateEntry(form: FormControl) {
    this.entryService.update(this.entry)
    .then((entry) => {
      // this.entry = entry; (Unexpected literal at position 2)
      this.toastr.success('Lançamento editado com sucesso!');
      this.atualizarTituloEdicao();
    })
    .catch(error => this.errorHandler.handle(error));
  }

  loadEntry(id: number) {
    return this.entryService.findById(id)
      .then(entry => {
        this.entry = entry;
        console.log(this.entry.category);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  loadCategories() {
    return this.categoryService.listarTodas()
    .then(categories => {
      this.categories = categories.map(data => ({label: data.name, value: data.id}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  loadPeople() {
    return this.personService.listarTodas()
    .then(people => {
      this.people = people.map(data => ({label: data.name, value: data.id}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  new(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.entry = new Entry();
    }.bind(this), 1);
    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Lançamento: ${this.entry.description}`);
  }

}
