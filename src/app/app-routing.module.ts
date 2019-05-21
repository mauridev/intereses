import { CalculoInteresesFamiliarComponent } from './calculo-intereses-familiar/calculo-intereses-familiar.component';
import { CalculoInteresesComponent } from './calculo-intereses/calculo-intereses.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {path: '',
  component: InicioComponent},
  {path: 'inicio',
  component: InicioComponent},
  {path: 'calculo-intreses',
  component: CalculoInteresesComponent},
  {path: 'calculo-intreses-familiares',
  component: CalculoInteresesFamiliarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
