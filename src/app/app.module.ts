import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculoInteresesComponent } from './calculo-intereses/calculo-intereses.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    CalculoInteresesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
