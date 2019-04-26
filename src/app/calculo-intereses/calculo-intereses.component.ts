import { ItemCtaCte } from './../classes/item-cta-cte';
import { Component, OnInit } from '@angular/core';
import datosCtaCte from '../../assets/data/ctacte.json';
import * as moment from 'moment';


@Component({
  selector: 'app-calculo-intereses',
  templateUrl: './calculo-intereses.component.html',
  styleUrls: ['./calculo-intereses.component.css']
})
export class CalculoInteresesComponent implements OnInit {

ctaCte: ItemCtaCte[] = datosCtaCte;



constructor() {
 
 }


ngOnInit() {
  this.calcularDias();
  console.log(this.ctaCte);
  
}

calcularDias = () => {
  for(let cuenta of this.ctaCte) {
      cuenta.dias = 5;
  }
  this.cantDiasEntreDosFechas();
}

cantDiasEntreDosFechas = () => {
  let now = moment;
  console.log(now);
  console.log((this.ctaCte[0].FECHA));
}

}

