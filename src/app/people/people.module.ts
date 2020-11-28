import { PeopleRoutingModule } from './people-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PeopleSearchComponent } from './people-search/people-search.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    PersonFormComponent,
    PeopleSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    HttpClientModule,

    InputMaskModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,

    SharedModule,
    PeopleRoutingModule,
  ],
  exports: []
})
export class PeopleModule { }
