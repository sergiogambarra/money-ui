import { Entry } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

export class EntryFilter {
  description: string;
  dueDateFrom: Date;
  dueDateTo: Date;
  page = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  entryUrl: string;

  constructor(
    private http: HttpClient
  ) {
      this.entryUrl = `${environment.apiUrl}/lancamentos`;
    }

  pesquisar(filter: EntryFilter): Promise<any> {

    let params = new HttpParams();


    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itensPorPagina.toString());

    if (filter.description) {
      params = params.set('description', filter.description);
    }

    if (filter.dueDateFrom) {
      params = params.set('dueDateFrom',
        moment(filter.dueDateFrom).format('YYYY-MM-DD'));
    }

    if (filter.dueDateTo) {
      params = params.set('dueDateTo',
        moment(filter.dueDateTo).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.entryUrl}?resumo`, { params })
        .toPromise()
        .then(response => {
          const entry = response.content;

          const resultado = {
            entry,
            total: response.totalElements
          };
          return resultado;
        });
    }

    excluir(id: number): Promise<void> {
      return this.http.delete(`${this.entryUrl}/${id}`)
        .toPromise()
        .then(() => null);
    }

    add(entry: Entry): Promise<Entry> {

      return this.http.post<Entry>(this.entryUrl, entry)
        .toPromise()
        .then(response => response);


    }

    update(entry: Entry): Promise<Entry> {
      return this.http.put<Entry>(`${this.entryUrl}/${entry.id}`, entry)
        .toPromise()
        .then(response => response);

    }

    findById(id: number): Promise<Entry> {
      return this.http.get<Entry>(`${this.entryUrl}/${id}`)
          .toPromise()
          .then(response => {
            const entry = response;
            this.convertStringToDate([entry]);
            return entry;
          });
    }

    private convertStringToDate(entries: Entry[]) {
      entries.forEach(entry => {
        entry.dueDate = moment(entry.dueDate, 'YYYY-MM-DD').toDate();

        if (entry.payDate) {
          entry.payDate = moment(entry.payDate, 'YYYY-MM-DD').toDate();
        }
      });
    }

}
