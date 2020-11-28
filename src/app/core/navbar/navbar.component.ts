import { Router } from '@angular/router';
import { LogoutService } from './../../security/logout.service';
import { AuthService } from './../../security/auth.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    ) {}


  exibindoMenu = false;


  ngOnInit() {
  }

  logout(){
    this.logoutService.logout()
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  getNewAccessToken(){
    this.auth.getNewAccessToken();
  }

  // tslint:disable-next-line: typedef
  // toggle() {
  //   this.show = !this.show;

  //   // CHANGE THE NAME OF THE BUTTON.
  //   if (this.show) {
  //     this.buttonName = 'Hide';
  //   }
  //   else {
  //     this.buttonName = 'Show';
  //   }
  // }

}
