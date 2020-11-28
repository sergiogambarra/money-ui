import { EntriesRoutingModule } from './entries-routing.module';
import { EntriesSearchComponent } from './entries-search/entries-search.component';
import { SharedModule } from '../shared/shared.module';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [
    EntryFormComponent,
    EntriesSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

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
    EntriesRoutingModule,
  ],
  exports: []
})
export class EntriesModule { }
