import { ActivatedRoute, Router } from '@angular/router';
import { City, Person, State } from './../../core/model';
import { PersonService } from './../person.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  states = [];
  estado = new State();
  cidade = new City();
  cities = [];
  // cities = [];
  person = new Person();

  async modo() {

    this.getStateById(this.estado.id);
    this.cities = await this.loadCities(this.estado.id);
      this.cities = this.cities.map(data => ({label: data.nome, value: data.id}));
  }


  constructor(
    private personService: PersonService,
    private toastr: ToastrService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit() {

    const idPerson = this.route.snapshot.params.id;

    this.title.setTitle('Nova Pessoa');

    if (idPerson) {
      this.loadPerson(idPerson);
    }
    this.loadStates();
  }

  public get editando(): boolean {
    return Boolean(this.person.id);
  }

  save(form: FormControl) {
    if (this.editando) {
      this.updatePerson(form);
    } else {
      this.add(form);
    }
  }

  add(form: FormControl) {
    this.getCityById(this.cidade.id)
    .then(async city =>  {
      this.cidade.name = await city.nome;
      this.person.address.city = this.cidade.name;

      this.personService.add(this.person)
      .then(personAdded => {
        this.toastr.success('Pessoa adicionada com sucesso!');
        this.router.navigate(['/pessoas', personAdded.id]);
      })
      .catch(error => this.errorHandler.handle(error));
    });
  }


  updatePerson(form: FormControl) {
    this.getCityById(this.cidade.id)
    .then(async city =>  {
      this.cidade.name = await city.nome;
      this.person.address.city = this.cidade.name;
      this.personService.update(this.person)
      .then(() => {
        this.toastr.success('Pessoa editada com sucesso!');
        this.updateTitleEdition();
      })
      .catch(error => this.errorHandler.handle(error));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  loadPerson(id: number) {

    return this.personService.findById(id)
    .then(async person => {
      this.person = person;
      this.atualizarTituloEdicao();
      this.states.filter(state => {
        if (state.label === this.person.address.state) {
          this.estado = {id: state.value, name: state.label};
        }
      });

      this.cities = await this.loadCities(this.estado.id);
      this.cities = this.cities.map(data => ({label: data.nome, value: data.id}));

      this.cities.filter(city => {
        if (city.label === this.person.address.city) {
          this.cidade = {id: city.value, name: city.label};
        }
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidade(cidade: string, id: number) {
    return this.personService.getCities(id)
    .then(cities => {
      cities.filter(data => (cidade === data.nome))[0].nome;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  new(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.person = new Person();
    }.bind(this), 1);
    this.router.navigate(['/pessoas/novo']);
  }

  updateTitleEdition(){
    this.title.setTitle(`Edição de Pessoa: ${this.person.name}`);
  }

  loadStates() {
    return this.personService.getStates()
    .then(estados => {
      this.states =  estados.map(data => ({label: data.nome, value: data.id}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  loadCities(id: number) {
    return this.personService.getCities(id);
  }

  getStateById(id: number){
    return this.personService.findStateById(id)
    .then(state => {
      this.estado.name = state.nome;
      this.person.address.state = state.nome;
    }
      )
    .catch(erro => this.errorHandler.handle(erro));
  }
  getCityById(id: number){
    return this.personService.findCityById(id);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Pessoa: ${this.person.name}`);
  }

}
