import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Component, Injectable} from '@angular/core';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculoInteresesComponent } from './calculo-intereses/calculo-intereses.component';
import { from } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { CalculoInteresesFamiliarComponent } from './calculo-intereses-familiar/calculo-intereses-familiar.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculoInteresesComponent,
    HeaderComponent,
    InicioComponent,
    CalculoInteresesFamiliarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  bootstrap: [AppComponent]
})
export class AppModule { }
