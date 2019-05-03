import { ItemCtaCte} from './../classes/item-cta-cte';
import { Component, OnInit } from '@angular/core';

import datosCtaCte from '../../assets/data/ctacte.json';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calculo-intereses',
  templateUrl: './calculo-intereses.component.html',
  styleUrls: ['./calculo-intereses.component.css']
})
export class CalculoInteresesComponent implements OnInit {

ctaCte: ItemCtaCte[] = datosCtaCte;
fechaFinRemision: Date = new Date();
tasaDiariaEfectiva: number =  0.000133681;
saldoFinal: number;

constructor() {
  console.log('entre al constructor');
  
  /*const itemFinDeRemision = new ItemCtaCte();
  itemFinDeRemision.FECHA = this.fechaFinRemision;
  itemFinDeRemision.REFERENCIA = 'Fecha Final';
  this.ctaCte.push(itemFinDeRemision);
  this.eliminarReferenciasInteresGenerado();
  this.ordenarPorFecha();*/
}


ngOnInit() {
  console.log('entre al OnINit');
  this.calculoAlgoritmo1();
}

/* Obtiene la fecha elegida del data picker */
onDateSelect =  () => {
  console.log(this.fechaFinRemision);
  this.eliminarReferenciasFechaFinal();
  this.calculoAlgoritmo1();
}

eliminarReferenciasFechaFinal = () => {
  for ( let i = 0; i < this.ctaCte.length; i++) {
    if ( this.ctaCte[i].REFERENCIA === 'Fecha Final') {
      this.ctaCte.splice(i, 1);
    }
 }
}

setFechaFinDeRemision = () => {
  const itemFinDeRemision = new ItemCtaCte();
  itemFinDeRemision.FECHA = this.fechaFinRemision;
  itemFinDeRemision.REFERENCIA = 'Fecha Final';
  this.ctaCte.push(itemFinDeRemision);
  this.eliminarReferenciasInteresGenerado();
  this.ordenarPorFecha();
}


ordenarPorFecha = () => {
  this.ctaCte.sort((a,b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return  new Date(a.FECHA).getTime() - new Date(b.FECHA).getTime();
  });
}

eliminarReferenciasInteresGenerado = () => {
  for( let i = 0; i < this.ctaCte.length; i++) {
    if ( this.ctaCte[i].IdRegistro_2 === 4) {
      this.ctaCte.splice(i, 1);
    }
 }
}

/* Caluculo Algoritmo 1
/////////////////////////////////////////
*/
/* Recibe el array de CtaCte y crea un array nuevo con los que pertenecen a los estados 12 y 13
 */


calculoAlgoritmo1 = () => {
  this.setFechaFinDeRemision();
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
      } else if ( index === array.length - 1) {
        itemCuenta.SALDO = array[index - 1].SALDO + array[index - 1].intereses;
        this.saldoFinal = itemCuenta.SALDO;
      } else {
        itemCuenta.SALDO = array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO + array[index - 1].intereses;
        itemCuenta.intereses = this.calcularFormularInteres(itemCuenta.SALDO, itemCuenta.dias);
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
   return  saldoAnterior * dias * this.tasaDiariaEfectiva;
}



 /* Fin Calculo Algoritmo 1 */





}

