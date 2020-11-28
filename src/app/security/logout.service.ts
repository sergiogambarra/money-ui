import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRenokeUrl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {
    this.tokensRenokeUrl = `${environment.apiUrl}/tokens/revoke`;
   }

  logout() {
    return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
    .toPromise()
    .then(() => {
      this.auth.clearAccessToken();
    });
  }
}
