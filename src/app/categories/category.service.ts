import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryUrl: string;

  constructor(
    private http: HttpClient,
    ) {
      this.categoryUrl = `${environment.apiUrl}/categorias`;
    }

  listarTodas(): Promise<any> {

    return this.http.get<any>(this.categoryUrl)
      .toPromise()
      .then(response => response);

  }

}
