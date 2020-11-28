import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PersonFormComponent } from './person-form/person-form.component';
import { PeopleSearchComponent } from './people-search/people-search.component';
import { AuthGuard } from '../security/auth.guard';


const routes: Routes = [
  {
    path: 'pessoas', component: PeopleSearchComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA']}
  },
  {
    path: 'pessoas/novo', component: PersonFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA']}
  },
  {
    path: 'pessoas/:id', component: PersonFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA']}
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
