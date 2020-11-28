import { Person } from './../core/model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export class PersonFilter {
  name: string;
  active: boolean;
  page = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})

export class PersonService {

  personUrl: string;
  statesUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  municipiosUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios';

  constructor(private http: HttpClient) {
    this.personUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filter: PersonFilter): Promise<any> {

    let params = new HttpParams();

    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itensPorPagina.toString());

    if (filter.name) {
      params = params.set('name', filter.name);
    }

    return this.http.get<any>(`${this.personUrl}`, { params })
        .toPromise()
        .then(response => {
          const person = response.content;

          const result = {
            person,
            total: response.totalElements
          };
          return result;
        });
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.personUrl)
      .toPromise()
      .then(response => response.content);

  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.personUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  ativarInativar(id: number, active: boolean): Promise<void> {

    let body;
    if (active){
      body = 'false';
    } else {
      body = 'true';
    }

    return this.http.put(`${this.personUrl}/${id}/active`, body)
      .toPromise()
      .then(() => null);
  }

  add(person: Person): Promise<Person> {
    return this.http.post<Person>(this.personUrl, person)
      .toPromise()
      .then(response => response);
  }

  update(person: Person): Promise<Person> {
    return this.http.put<Person>(`${this.personUrl}/${person.id}`, person)
      .toPromise()
      .then(response => response);

  }

  findById(id: number): Promise<Person> {
    return this.http.get<Person>(`${this.personUrl}/${id}`)
        .toPromise()
        .then(response => response);
  }
  findStateById(id: number): Promise<any> {
    return this.http.get(`${this.statesUrl}/${id}`)
        .toPromise()
        .then(response => response);
  }
  findCityById(id: number): Promise<any> {
    return this.http.get(`${this.municipiosUrl}/${id}`)
        .toPromise()
        .then(response => response);
  }

  getStates(): Promise<any> {
    return this.http.get(this.statesUrl)
        .toPromise()
        .then(response => response);
  }

  getCities(id: number): Promise<any> {
    return this.http.get(`${this.statesUrl}/${id}/municipios`)
        .toPromise()
        .then(response => response);
  }

}
