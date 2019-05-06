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
esLaFechaFinalElUltimoDato = true;
indiceFechaFinal: number;

constructor() {
}


ngOnInit() {
  this.calculoAlgoritmo1();
}

/* Obtiene la fecha elegida del data picker */
onDateSelect =  () => {
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
  itemFinDeRemision.id = '000000';
  this.ctaCte.push(itemFinDeRemision);
  this.eliminarReferenciasInteresGenerado();
  this.ordenarPorFecha();
}


ordenarPorFecha = () => {
  this.ctaCte.sort((a,b) => {
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

/* Obtengo el indice de la fecha final */
indiceFechaFinalNumerico = () => {
  const cuentaParaTrabajo = this.ctaCte.slice();
  const indiceDeFechaFinal = cuentaParaTrabajo.findIndex(cu => cu.id === '000000');
  this.indiceFechaFinal = indiceDeFechaFinal;
}

indiceFechaFinalBool = () => {
  const cuentaParaTrabajo = this.ctaCte.slice();
  const indiceDeFechaFinal = cuentaParaTrabajo.findIndex(cu => cu.id === '000000');
  if (indiceDeFechaFinal === cuentaParaTrabajo.length - 1) {
    this.esLaFechaFinalElUltimoDato = true;
  } else {
    this.esLaFechaFinalElUltimoDato = false;
  }
}


/* Caluculo Algoritmo 1
/////////////////////////////////////////
*/
/* Recibe el array de CtaCte y crea un array nuevo con los que pertenecen a los estados 12 y 13
 */


calculoAlgoritmo1 = () => {
  this.setFechaFinDeRemision();
  this.indiceFechaFinalBool();

  if (this.esLaFechaFinalElUltimoDato === true) {
      this.calcularDiasParaCuentaCorriente();
      this.calcularSaldosParaCuentaCorriente();
  } else {
      this.indiceFechaFinalNumerico();
      this.calcularDiasParaCuentaCorriente2();
      this.calcularSaldosParaCuentaCorriente2();
      console.log(this.indiceFechaFinal);
  }
}

/*Calcular Dias Para Cuenta Corriente */
calcularDiasParaCuentaCorriente = () => {
  let cuentaParaTrabajo = this.ctaCte.slice();
  let cuentaDevuelta = cuentaParaTrabajo.map((itemCuenta, index, array) => {
      /* Calculo los dias para los items de las la Cta Cte desde el 2do ITEM hasta el ultimo */
      if ( index < array.length - 1) {
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

/* Calcular los Saldos */
/* Calculo Nuevo SALDO = S - 1 +D -C + I */
calcularSaldosParaCuentaCorriente2 = () => {
  let cuentaParaTrabajo = this.ctaCte.slice();
  let indiceDeFechaFinal = cuentaParaTrabajo.findIndex(cuentaParaTrabajo => cuentaParaTrabajo.REFERENCIA == 'Fecha Final');
  
  let cuentaDevuelta = cuentaParaTrabajo.map( (itemCuenta, index, array) => {
      if (index === 0) {
        itemCuenta.SALDO = itemCuenta.DEBITO;
        itemCuenta.intereses = this.calcularFormularInteres(itemCuenta.SALDO, itemCuenta.dias);
      } else if (index === array.length - 1) { // ultimo caso
        itemCuenta.SALDO = array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO + array[index - 1].intereses;
        this.saldoFinal = itemCuenta.SALDO;
      } else if (index === indiceDeFechaFinal) { // igual a fecha final
          itemCuenta.SALDO = array[index - 1].SALDO + array[index - 1].intereses;
          itemCuenta.intereses = this.calcularFormularInteres(itemCuenta.SALDO, itemCuenta.dias);
      } else if (index < indiceDeFechaFinal) { //menor a fecha final
        itemCuenta.SALDO = array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO + array[index - 1].intereses;
        itemCuenta.intereses = this.calcularFormularInteres(itemCuenta.SALDO, itemCuenta.dias);
      } else if (index > indiceDeFechaFinal) {
        itemCuenta.SALDO = array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO;
        itemCuenta.intereses = this.calcularFormularInteres(itemCuenta.SALDO, itemCuenta.dias);
      }

  });



  return cuentaDevuelta;
}

/*Calcular Dias Para Cuenta Corriente cuando la fecha de fin de remision no es el utlimo dato */
calcularDiasParaCuentaCorriente2 = () => {
  let cuentaParaTrabajo = this.ctaCte.slice();
  let cuentaDevuelta = cuentaParaTrabajo.map((itemCuenta, index, array) => {
    if ( index < array.length) {
      if ( index < this.indiceFechaFinal) {
          itemCuenta.dias = this.calcularCantidadDias(itemCuenta.FECHA, array[index + 1].FECHA);
      } else {
        itemCuenta.dias = 0;
        itemCuenta.intereses = 0;
      }
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

