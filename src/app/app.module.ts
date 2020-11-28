import { SecurityModule } from './security/security.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PeopleModule } from './people/people.module';
import { EntriesModule } from './entries/entries.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import localept from '@angular/common/locales/pt';

import { CoreModule } from './core/core.module';
import { registerLocaleData } from '@angular/common';


registerLocaleData(localept, 'pt');

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule,
    EntriesModule,
    PeopleModule,
    SecurityModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
