import { AuthGuard } from './../security/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntriesSearchComponent } from './entries-search/entries-search.component';


const routes: Routes = [
  {
    path: 'lancamentos', component: EntriesSearchComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO']}
  },
  {
    path: 'lancamentos/novo', component: EntryFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']}
  },
  {
    path: 'lancamentos/:id', component: EntryFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']}
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
