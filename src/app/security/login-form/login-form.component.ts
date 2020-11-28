import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  login(user: string, password: string){
    this.auth.login(user, password)
      .then(() => {
        this.router.navigate(['/lancamentos']);
      })
      .catch(error => {
        this.errorHandler.handle(error);
      });
  }

}
