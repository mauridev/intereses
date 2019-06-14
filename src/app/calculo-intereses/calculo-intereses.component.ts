import { ExcelService } from './../services/excel.service';
import { ItemCtaCte} from './../classes/item-cta-cte';
import { Component, OnInit} from '@angular/core';


/* Importo NG Bootstrap para el manejo del calendario */
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-calculo-intereses',
  templateUrl: './calculo-intereses.component.html',
  styleUrls: ['./calculo-intereses.component.css']
})
export class CalculoInteresesComponent implements OnInit {

fileText: any = '[{}]';
ctaCte: ItemCtaCte[] = JSON.parse(this.fileText);
fechaFinRemision: Date = new Date();
fechaSolicitud: any = '';
lecheRemitidaHasta: any = '';
tasaDiariaEfectiva: number =  0.000133681;
saldoFinal: number;
esLaFechaFinalElUltimoDato = true;
indiceFechaFinal: number;
alertaMensaje = '';
alertaTipo = 'danger';
alerta = false;
verDias = false;

constructor(private excelService: ExcelService) {
}


ngOnInit() {
}

verDiasEnCalculo = () => {
  this.verDias = !this.verDias;
}

exportAsXLSX(): void {
  //this.ctaCte.
  this.excelService.exportAsExcelFile(this.ctaCte, 'ctaCte');
}

close = () => {
  this.alerta = false;
}
/* Recibe el evento con el archivo JSON que se está leyendo.
y registra la información en la propiedad fileText */
fileUpload(event) {
  const reader = new FileReader();
  reader.readAsText(event.srcElement.files[0]);
  const me = this;
  reader.onload = () => {
    me.fileText = reader.result;
    me.ctaCte = JSON.parse(me.fileText);
  };
}

/* Obtiene la fecha elegida del data picker y llama a la funcion calculoAlgoritmo1
la cual dispara el calculo de intereses. Ya que pose la info necesaria para realizar el calculo.
*/
onDateSelect =  () => {
  if (this.ctaCte.length <= 1 ) {
    this.alertaTipo = 'danger';
    this.alertaMensaje = 'Seleccione un archivo de Cuenta Corriente en formato .JSON';
    this.alerta = true;
  } else {
    this.eliminarReferenciasFechaFinal();
    this.calculoAlgoritmo1();
  }
}



/* Caluculo Algoritmo 1
/////////////////////////////////////////
*/
/* Recibe el array de CtaCte y crea un array nuevo con los que pertenecen a los estados 12 y 13
 */

/* Elimina toda referencia que sea Fecha Final */
eliminarReferenciasFechaFinal = () => {
  for ( let i = 0; i < this.ctaCte.length; i++) {
    if ( this.ctaCte[i].REFERENCIA === 'Fecha Final') {
      this.ctaCte.splice(i, 1);
}}}

/* Setea la referencia Fecha Final con el dato que posea la propiedad Fecha Fin Remision */
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
  for ( let i = 0; i < this.ctaCte.length; i++) {
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

redondear = (numero) => {
  return Math.round(numero);
}

calculoAlgoritmo1 = () => {
  this.setFechaFinDeRemision();
  this.indiceFechaFinalBool();

  if (this.esLaFechaFinalElUltimoDato === true) {
      this.calcularDiasParaCuentaCorriente();
      this.calcularSaldosParaCuentaCorriente();
  } else {
      this.indiceFechaFinalNumerico();
      this.calcularDiasParaCuentaCorriente2();
      this.calcularSaldosParaCuentaCorrienteFechaMovil();
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
        itemCuenta.SALDO = this.redondear(itemCuenta.DEBITO);
        itemCuenta.intereses = this.calcularFormularInteres(itemCuenta.SALDO, itemCuenta.dias);
      } else if ( index === array.length - 1) {
        itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + array[index - 1].intereses);
        console.log(this.saldoFinal);
        
        this.saldoFinal = itemCuenta.SALDO;
        console.log(this.saldoFinal);
      } else {
        itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO + array[index - 1].intereses);
        itemCuenta.intereses = this.calcularFormularInteres(itemCuenta.SALDO, itemCuenta.dias);
      }
});
  return cuentaDevuelta;
}

/* Calcular los Saldos Fecha Movil:
Realiza el calculo de Saldos teniendo en cuenta que la Fecha Final o
Fecha de fin de remisión no es el último registro de los datos recibidos.
*/
calcularSaldosParaCuentaCorrienteFechaMovil = () => {
  const cuentaParaTrabajo = this.ctaCte.slice();
  const indiceDeFechaFinal = cuentaParaTrabajo.findIndex(cuentaParaTrabajo => cuentaParaTrabajo.REFERENCIA == 'Fecha Final');
  /* Mapea el array de datos realizando los calculos */
  const cuentaDevuelta = cuentaParaTrabajo.map( (itemCuenta, index, array) => {
      if (index === 0) {
        itemCuenta.SALDO = this.redondear(itemCuenta.DEBITO);
        itemCuenta.intereses = this.calcularFormularInteres(itemCuenta.SALDO, itemCuenta.dias);
      } else if (index === array.length - 1) { // ultimo caso EL SALDO FINAL.
        itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO + array[index - 1].intereses);
        this.saldoFinal = itemCuenta.SALDO;
      } else if (index === indiceDeFechaFinal) { // igual a fecha final, último caso en el que se tiene en cuenta los intereses.
          itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + array[index - 1].intereses);
          itemCuenta.intereses = this.calcularFormularInteres(itemCuenta.SALDO, itemCuenta.dias);
      } else if (index < indiceDeFechaFinal) { // menor a fecha final, se realiza el calculo teniendo en cuenta los intereses
        itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO + array[index - 1].intereses);
        itemCuenta.intereses = this.calcularFormularInteres(itemCuenta.SALDO, itemCuenta.dias);
      } else if (index > indiceDeFechaFinal) {
        // mayor a fecha final, se realiza las restas de prestación pecuniaria sin tener en cuenta los intereses
        itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO);
        itemCuenta.intereses = this.calcularFormularInteres(itemCuenta.SALDO, itemCuenta.dias);
      }

  });
  return cuentaDevuelta;
}

/*Calcular Dias Para Cuenta Corriente cuando la fecha de fin de remision no es el utlimo dato */
calcularDiasParaCuentaCorriente2 = () => {
  const cuentaParaTrabajo = this.ctaCte.slice();
  const cuentaDevuelta = cuentaParaTrabajo.map((itemCuenta, index, array) => {
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
  const diaEnMilisegundos = 86400000;
  const diferenciaEnMilisegundos = fechaMayor - fechaMenor;
  const diferenciaEnDias = diferenciaEnMilisegundos / diaEnMilisegundos;
  return Math.floor( diferenciaEnDias);
}

calcularFormularInteres = (saldoAnterior, dias) => {
   return  this.redondear(saldoAnterior * dias * this.tasaDiariaEfectiva);
}



 /* Fin Calculo Algoritmo 1 */





}

