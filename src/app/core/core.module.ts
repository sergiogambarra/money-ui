import { CategoryService } from './../categories/category.service';
import { AuthService } from './../security/auth.service';
import { EntryService } from '../entries/entry.service';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NotificationService } from './notification.service';
import { ConfirmationService, MessageService } from 'primeng/api';

import { PersonService } from './../people/person.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastrModule.forRoot(),
    ConfirmDialogModule,
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  exports: [
    NavbarComponent,
    ToastrModule,
    ConfirmDialogModule
  ],
  providers:[
    EntryService,
    PersonService,
    CategoryService,
    ErrorHandlerService,
    AuthService,

    // NotificationService,
    // { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    // JwtHelperService,
    ConfirmationService,
    MessageService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt' },
  ]
})
export class CoreModule { }
