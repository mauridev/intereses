import { ItemCtaCte} from './../classes/item-cta-cte';
import { Component, OnInit } from '@angular/core';

import datosCtaCte from '../../assets/data/ctacte.json';

@Component({
  selector: 'app-calculo-intereses',
  templateUrl: './calculo-intereses.component.html',
  styleUrls: ['./calculo-intereses.component.css']
})
export class CalculoInteresesComponent implements OnInit {

ctaCte: ItemCtaCte[] = datosCtaCte;
fechaFinRemision: Date = new Date('2019/04/26');
tasaDiariaEfectiva: number =  0.000133681;

constructor() {
  console.log('entre al constructor');
  let itemFinDeRemision = new ItemCtaCte();
  itemFinDeRemision.FECHA = this.fechaFinRemision;
  this.ctaCte.push(itemFinDeRemision);
}


ngOnInit() {
  console.log('entre al OnINit');
  this.calculoAlgoritmo1();
}





/* Caluculo Algoritmo 1
/////////////////////////////////////////
*/
/* Recibe el array de CtaCte y crea un array nuevo con los que pertenecen a los estados 12 y 13
 */ 


calculoAlgoritmo1 = () => {

  this.calcularDiasParaCuentaCorriente();
  this.calcularSaldosParaCuentaCorriente();
  

}

/*Calcular Dias Para Cuenta Corriente */
calcularDiasParaCuentaCorriente = () => {
  let cuentaParaTrabajo = this.ctaCte.slice();
  let cuentaDevuelta = cuentaParaTrabajo.map((itemCuenta, index, array) => {
      /* Calculo los dias para los items de las la Cta Cte desde el 2do ITEM hasta el ultimo */
      if( index < array.length - 1) {
          itemCuenta.dias = this.calcularCantidadDias(itemCuenta.FECHA, array[index + 1].FECHA);
      }
  });
  return cuentaDevuelta;
}


/* Calcular Intereses */
/* Saldo anterior * Dias * Tasa Diaria Efectiva */
calcularInteresParaCuentaCorriente = () => {
  let cuentaParaTrabajo = this.ctaCte.slice();
  let cuentaDevuelta = cuentaParaTrabajo.map((itemCuenta, index, array) => {
    
        itemCuenta.intereses = this.calcularFormularInteres(array[index - 1].SALDO, itemCuenta.dias);
    
});
  return cuentaDevuelta;
}


/* Calcular los Saldos */
/* Calculo Nuevo SALDO = S - 1 +D -C + I */
calcularSaldosParaCuentaCorriente = () => {
  let cuentaParaTrabajo = this.ctaCte.slice();
  let cuentaDevuelta = cuentaParaTrabajo.map((itemCuenta, index, array) => {
    if ( index === 0) {
        itemCuenta.SALDO = itemCuenta.DEBITO;
        itemCuenta.intereses = this.calcularFormularInteres(itemCuenta.SALDO, itemCuenta.dias);     
      } else { 
        /* intereses primero y despues saldo */
      }
});
  return cuentaDevuelta;
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

calcularFormularInteres = (saldoAnterior, dias) => {
   return  Math.round(saldoAnterior * dias * this.tasaDiariaEfectiva);
}



 /* Fin Calculo Algoritmo 1 */





}

