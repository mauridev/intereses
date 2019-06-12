import { Component, OnInit } from '@angular/core';
import { ItemCtaCte} from './../classes/item-cta-cte';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calculo-intereses-familiar',
  templateUrl: './calculo-intereses-familiar.component.html',
  styleUrls: ['./calculo-intereses-familiar.component.css']
})
export class CalculoInteresesFamiliarComponent implements OnInit {

  fileText: any = '[{}]';
  ctaCte: ItemCtaCte[] = JSON.parse(this.fileText);
  ctaCteSegundaParte: ItemCtaCte[];
  fechaFinRemision: Date = new Date();
  tasaDiariaEfectiva: number =  0.000133681;
  saldoFinal: number;
  saldoSubsidio: number;

  esLaFechaFinalElUltimoDato = true;
  indiceFechaFinal: number;

  compromisoReal: number = (70685234 / 1882491174);
  coeficienteAdelanto: number = (42104000 / 1896816669)
  coeficienteSaldo: number = (this.compromisoReal - this.coeficienteAdelanto);
  obligacionRealTotal: number;
  obligacionAdelanto: number;
  obligacionSaldo: number;

  litrosBeneficio: number;
  alertaMensaje = '';
  alertaTipo = 'danger';
  alerta = false;

  constructor() { }

  ngOnInit() {
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
      me.ctaCteSegundaParte = JSON.parse(me.fileText);
    };
  }

  setObligacionRealTotal = () => {
       const arra = this.ctaCte.filter(item => item.OBLIGACION_REAL_PF != 0);
       if (arra.length === 1) {
          this.obligacionRealTotal = arra[0].OBLIGACION_REAL_PF;
          this.litrosBeneficio = this.redondear(this.obligacionRealTotal / this.compromisoReal);
          this.obligacionAdelanto = this.redondear(this.litrosBeneficio * this.coeficienteAdelanto);
          this.obligacionSaldo = this.redondear(this.litrosBeneficio * this.coeficienteSaldo);
          return 'La cuenta corriente posee 1 valor de obligación real';
       } else if (arra.length >= 2){
          return 'La cuenta corriente posee 2 valor de obligación real';
       } else {
          return 'No posee obligación real, este no es Productor Familiar GIL!';
       }
    }

  onDateSelect =  () => {
    if (this.ctaCte.length <= 1 ) {
      this.alertaTipo = 'danger';
      this.alertaMensaje = 'Seleccione un archivo de Cuenta Corriente en formato .JSON';
      this.alerta = true;
    } else {
       
        this.setObligacionRealTotal();
        this.eliminarReferenciasFechaFinal();
        this.calculoAlgoritmoPF();
    }
  }

  /* Elimina toda referencia que sea Fecha Fina */
  eliminarReferenciasFechaFinal = () => {
    for (let i = 0; i < this.ctaCte.length; i++) {
      if (this.ctaCte[i].REFERENCIA === 'Fecha Final') {
        this.ctaCte.splice(i, 1);
      }
    }
  }

  calculoAlgoritmoPF = () => {
    this.setFechaFinDeRemision(this.ctaCte);
    this.primeraParteSetAdelantoYSaldo();
    this.segundaParteDeletePrestaciones();
    this.setFechaFinDeRemision(this.ctaCteSegundaParte);
    this.indiceFechaFinalBool();

    if ( this.esLaFechaFinalElUltimoDato === true ) {
        this.calcularDiasParaCuentaCorriente(this.ctaCte);
        this.calcularSaldosParaCuentaCorriente();
        this.calcularDiasParaCuentaCorriente(this.ctaCteSegundaParte);
        this.calcularSaldoSubsidioParaCuentaCorriente();
    } else {
        this.indiceFechaFinalNumerico(this.ctaCte);
        this.calcularDiasParaCuentaCorrienteFechaMovil(this.ctaCte);
        this.calcularSaldosParaCuentaCorrienteFechaMovil();
        this.indiceFechaFinalNumerico(this.ctaCteSegundaParte);
        this.calcularDiasParaCuentaCorrienteFechaMovil(this.ctaCteSegundaParte);
        this.calcularSaldoSubsidioParaCuentaCorriente();
    }
  }


  calcularSaldosSubsidioParaCuentaCorrienteFechaMovil = () => {
    const cuentaParaTrabajo = this.ctaCteSegundaParte.slice();
    const indiceDeFechaFinal = cuentaParaTrabajo.findIndex(cuentaParaTrabajo => cuentaParaTrabajo.REFERENCIA == 'Fecha Final');
    /* Mapea el array de datos realizando los calculos */
    const cuentaDevuelta = cuentaParaTrabajo.map( (itemCuenta, index, array) => {
        if (index === 0) {
          itemCuenta.SALDO = this.redondear(itemCuenta.DEBITO);
          itemCuenta.intereses = this.calcularFormulaInteres(itemCuenta.SALDO, itemCuenta.dias);
        } else if (index === array.length - 1) { // ultimo caso EL SALDO FINAL.
          itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO + array[index - 1].intereses);
          this.saldoSubsidio = itemCuenta.SALDO;
          console.log("entro aca al calculo del subsidio y es " + this.saldoSubsidio);
          
        } else if (index === indiceDeFechaFinal) { // igual a fecha final, último caso en el que se tiene en cuenta los intereses.
            itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + array[index - 1].intereses);
            itemCuenta.intereses = this.calcularFormulaInteres(itemCuenta.SALDO, itemCuenta.dias);
        } else if (index < indiceDeFechaFinal) { // menor a fecha final, se realiza el calculo teniendo en cuenta los intereses
          itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO + array[index - 1].intereses);
          itemCuenta.intereses = this.calcularFormulaInteres(itemCuenta.SALDO, itemCuenta.dias);
        } else if (index > indiceDeFechaFinal) {
          // mayor a fecha final, se realiza las restas de prestación pecuniaria sin tener en cuenta los intereses
          itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO);
          itemCuenta.intereses = this.calcularFormulaInteres(itemCuenta.SALDO, itemCuenta.dias);
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
        itemCuenta.intereses = this.calcularFormulaInteres(itemCuenta.SALDO, itemCuenta.dias);
      } else if (index === array.length - 1) { // ultimo caso EL SALDO FINAL.
        itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO + array[index - 1].intereses);
        this.saldoFinal = itemCuenta.SALDO;
      } else if (index === indiceDeFechaFinal) { // igual a fecha final, último caso en el que se tiene en cuenta los intereses.
          itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + array[index - 1].intereses);
          itemCuenta.intereses = this.calcularFormulaInteres(itemCuenta.SALDO, itemCuenta.dias);
      } else if (index < indiceDeFechaFinal) { // menor a fecha final, se realiza el calculo teniendo en cuenta los intereses
        itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO + array[index - 1].intereses);
        itemCuenta.intereses = this.calcularFormulaInteres(itemCuenta.SALDO, itemCuenta.dias);
      } else if (index > indiceDeFechaFinal) {
        // mayor a fecha final, se realiza las restas de prestación pecuniaria sin tener en cuenta los intereses
        itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO);
        itemCuenta.intereses = this.calcularFormulaInteres(itemCuenta.SALDO, itemCuenta.dias);
      }

  });
  return cuentaDevuelta;
}

  /*Calcular Dias Para Cuenta Corriente cuando la fecha de fin de remision no es el utlimo dato */
  calcularDiasParaCuentaCorrienteFechaMovil = (cuentaRecibida) => {
    const cuentaParaTrabajo = cuentaRecibida.slice();
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

  indiceFechaFinalNumerico = (cuentaRecibida) => {
    const cuentaParaTrabajo = cuentaRecibida.slice();
    const indiceDeFechaFinal = cuentaParaTrabajo.findIndex(cu => cu.id === '000000');
    this.indiceFechaFinal = indiceDeFechaFinal;
  }

  redondear = (numero) => {
    return Math.round(numero);
  }

  calcularFormulaInteres = (saldoAnterior, dias) => {
    return  this.redondear(saldoAnterior * dias * this.tasaDiariaEfectiva);
 }
  /* Calcular Saldos */
  /* Calcul Nuevo SALDO = S- 1 + D -C + I */
  calcularSaldosParaCuentaCorriente = () => {
    const cuentaParaTrabajo = this.ctaCte.slice();
    const cuentaDevuelta = cuentaParaTrabajo.map((itemCuenta, index, array) => {
      if ( index === 0) {
        itemCuenta.SALDO = this.redondear(itemCuenta.DEBITO);
        itemCuenta.intereses = this.calcularFormulaInteres(itemCuenta.SALDO, itemCuenta.dias);
      } else if ( index === array.length - 1) {
        itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + array[index - 1].intereses);
        this.saldoFinal = itemCuenta.SALDO;
      } else { 
        itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO + array[index - 1].intereses);
        itemCuenta.intereses = this.calcularFormulaInteres(itemCuenta.SALDO, itemCuenta.dias);
      }
    });
    return cuentaDevuelta;
  }

  calcularSaldoSubsidioParaCuentaCorriente = () => {
    const cuentaParaTrabajo = this.ctaCteSegundaParte.slice();
    const cuentaDevuelta = cuentaParaTrabajo.map((itemCuenta, index, array) => {
      if ( index === 0) {
        itemCuenta.SALDO = this.redondear(itemCuenta.DEBITO);
        itemCuenta.intereses = this.calcularFormulaInteres(itemCuenta.SALDO, itemCuenta.dias);
      } else if ( index === array.length - 1) {
        itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + array[index - 1].intereses);
        this.saldoSubsidio = itemCuenta.SALDO;
      } else {
        itemCuenta.SALDO = this.redondear(array[index - 1].SALDO + itemCuenta.DEBITO - itemCuenta.CREDITO + array[index - 1].intereses);
        itemCuenta.intereses = this.calcularFormulaInteres(itemCuenta.SALDO, itemCuenta.dias);
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
    return Math.floor( diferenciaEnDias );
  }

  calcularDiasParaCuentaCorriente = (cuentaRecibida) => {
    const cuentaParaTrabajo = cuentaRecibida.slice();
    const cuentaDevuelta = cuentaParaTrabajo.map((itemCuenta, index, array) => {
        if ( index < array.length - 1) {
          itemCuenta.dias = this.calcularCantidadDias(itemCuenta.FECHA, array[index + 1].FECHA);
        }
    });
    return cuentaDevuelta;
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

  segundaParteDeletePrestaciones = () => {
    console.log(this.ctaCteSegundaParte.length);
    let contadorDosVeces = 1;
    for (let i = 0; i < this.ctaCteSegundaParte.length; i++) {
      if (this.ctaCteSegundaParte[i].IdRegistro_2 === 12 || this.ctaCteSegundaParte[i].IdRegistro_2 === 13) {
        console.log(i);
        if (contadorDosVeces === 1 ) {
          this.ctaCteSegundaParte[i].DEBITO = this.ctaCteSegundaParte[i].DEBITO  - this.obligacionAdelanto;
          contadorDosVeces = contadorDosVeces + 1;
        } else if (contadorDosVeces === 2) {
          this.ctaCteSegundaParte[i].DEBITO = this.ctaCteSegundaParte[i].DEBITO  - this.obligacionSaldo;
          contadorDosVeces = contadorDosVeces + 1;
        }
      } else {
        console.log(i);
        this.ctaCteSegundaParte.splice(i, 1);
        i = i - 1;
      }
    }
  }

  primeraParteSetAdelantoYSaldo = () => {
    let auxiliarNumerico = 1;
    for (let i = 0; i < this.ctaCte.length; i ++) {
      if (this.ctaCte[i].IdRegistro_2 === 12 || this.ctaCte[i].IdRegistro_2 === 13) {
        if (auxiliarNumerico === 1) {
          this.ctaCte[i].DEBITO = this.obligacionAdelanto;
          auxiliarNumerico = auxiliarNumerico + 1;
        } else if (auxiliarNumerico === 2) {
          this.ctaCte[i].DEBITO = this.obligacionSaldo;
          auxiliarNumerico = auxiliarNumerico + 1;
        } else if (auxiliarNumerico >= 3 ) {
          this.ctaCte.splice(i, 1);
        }
      }
    }
  }

  /* Setea la referencia Fecha Final con el dato que posea la propiedad Fecha Fin Remision */
  setFechaFinDeRemision = (cuentaRecibida) => {
    const itemFinDeRemision = new ItemCtaCte();
    itemFinDeRemision.FECHA = this.fechaFinRemision;
    itemFinDeRemision.REFERENCIA = 'Fecha Final';
    itemFinDeRemision.id = '000000';
    cuentaRecibida.push(itemFinDeRemision);
    this.eliminarReferenciasInteresGenerado(cuentaRecibida);
    this.ordenarPorFecha(cuentaRecibida);

  }

  eliminarReferenciasInteresGenerado = (cuentaRecibida) => {
    for ( let i = 0; i < cuentaRecibida.length; i++ ) {
      if ( cuentaRecibida[i].IdRegistro_2 === 4 ) {
        cuentaRecibida.splice(i, 1);
      }
    }
  }


  ordenarPorFecha = (cuentaRecibida) => {
    cuentaRecibida.sort((a, b) => {
      return new Date(a.FECHA).getTime() - new Date(b.FECHA).getTime();
    });
  }

}
