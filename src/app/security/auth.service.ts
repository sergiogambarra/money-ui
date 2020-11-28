import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.loadToken();
   }

  login(user: string, password: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
      .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${user}&password=${password}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        console.log(response);
        this.storeToken(response['access_token']);
      })
      .catch(response => {
        if (response.status === 400) {
          if (response.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida');
          }
        }
        return Promise.reject(response);
      });

  }


  getNewAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
      .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';
    return this.http.post(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.storeToken(response['access_token']);
        console.log('novo access token criado!');
        return Promise.resolve(null);

      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalid(){
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  clearAccessToken(){
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  hasPermission(permission: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permission);
  }

  hasAnyPermission(roles) {
    for (const role of roles) {
      if (this.hasPermission(role)) {
        return true;
      }
    }

    return false;
  }

  private storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private loadToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.storeToken(token);
    }
  }

}
