import { ItemCtaCte } from './../classes/item-cta-cte';
import { Component, OnInit } from '@angular/core';

import datosCtaCte from '../../assets/data/ctacte.json';

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
  this.transformarFechas();
  this.calculoAlgoritmo1();
}




/* Caluculo Algoritmo 1
/////////////////////////////////////////
*/
/* Recibe el array de CtaCte y crea un array nuevo con los que pertenecen a los estados 12 y 13
 */

calculoAlgoritmo1 = () => {
  this.itemsBeneficio();
  this.itemsPagoDePrestacionPecuniaria();
}

itemsBeneficio = () => {
  let itemsDelPagoBeneficio = [];
  const demasItems = [];

  let primerPagoPrestacion = {};
  for( let item of this.ctaCte) {
      if ( item.IdRegistro_2 === 12 || item.IdRegistro_2 === 13) {
        itemsDelPagoBeneficio.push(item);
      } else {
        demasItems.push(item);
      }
  }

  // Verifico cual es el primer pago de prestacion pecuniaria.
  primerPagoPrestacion = this.itemPrimerPrestacion(demasItems);

  // Cuento la cantidad de DIAS que existen entre Primer Pago de Prestacion y los items de
  // Pago Beneficio
  itemsDelPagoBeneficio = this.calcularDiasPagoBeneficio(itemsDelPagoBeneficio, primerPagoPrestacion);

}

/* Devuelve el primer pago de prestacion, ya sea por CSV o DJ (1 o 2) respectivamente */
itemPrimerPrestacion = (demasItems) => {
  let primerPrestacion = {};
  for ( let item of demasItems) {
      if( item.IdRegistro_2 === 1 || item.IdRegistro_2 === 2) {
        primerPrestacion = item;
        break;
      }
  }
  return primerPrestacion;
}

/* Calcular dias entre dos fechas */
calcularDiasPagoBeneficio = (pagoDeBeneficio, primerPrestacionPecuniaria) => {
  for (let item of pagoDeBeneficio) {
    item.dias = this.calcularCantidadDias(item.FECHA, primerPrestacionPecuniaria.FECHA);
  }
  return pagoDeBeneficio;
}

/* Funcion para calcular cantidad de dias entre dos fechas */
calcularCantidadDias = (fechaMenor, fechaMayor) => {
  fechaMenor = new Date(fechaMenor).getTime();
  fechaMayor = new Date(fechaMayor).getTime();

  let dia_en_milisegundos = 86400000;
  let diff_en_milisegundos = fechaMayor - fechaMenor;
  let diff_en_dias = diff_en_milisegundos / dia_en_milisegundos;


  return Math.round(diff_en_dias);
}

/* Cuento los dias que existen entre todos los pagos de prestacion pecuniaria. ID 1 y 2 */
itemsPagoDePrestacionPecuniaria = () => {
  let cuentaCorriente = this.ctaCte.slice();
  let primerValor = true;

  for (let i = 0; i < cuentaCorriente.length; i++) {
    if ( cuentaCorriente[i].IdRegistro_2 === 1 || cuentaCorriente[i].IdRegistro_2 === 2) {
      if (primerValor == true ) {
        primerValor = false;
        cuentaCorriente[i].dias =  this.calcularCantidadDias(cuentaCorriente[i].FECHA, cuentaCorriente[i + 1].FECHA);
      } else {
        cuentaCorriente[i].dias =  this.calcularCantidadDias(cuentaCorriente[i - 1].FECHA, cuentaCorriente[i].FECHA);
      }
    }
  }
  console.log(cuentaCorriente);
  this.ctaCte = cuentaCorriente;
}


/* Transforma todas las fechas a DATE */
transformarFechas = () => {
  for ( let item of this.ctaCte ) {
    item.FECHA = new Date(item.FECHA);
  }
}
 /* Fin Calculo Algoritmo 1 */





}

