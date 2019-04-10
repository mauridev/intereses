import React, { Component } from "react";
import CtaCteItem from './CtaCteItem/CtaCteItem';
import CalculoSaldo from './CalculoSaldo/CalculoSaldo';



class Home extends Component {
    state = {
        cuentaCorriente: [
            {
                
                idRegistro:338,
                fecha: '11/12/2015',
                referencia: 'Pagado por BROU',
                debito: 796.00,
                credito: 0.00,
                saldo: -796.00,
            },
            {
                idRegistro: 339,
                fecha: '16/03/2016',
                referencia: 'Pagado por BROU',
                debito: 551.00,
                credito: 0.00,
                saldo: -1347.00,
            },
            {
                idRegistro:6889,
                fecha: '18/10/2016',
                referencia: 'csv CO.NA.PRO.LE. 09-2016 LTS:1.707,00 Prestación Pecuniaria 0,229 T/C:28,080 FechaTC:18/10/2016',
                debito:0.00,
                credito:13.92,
                saldo:-1333.08,
            },
            {
                idRegistro: 8725,
                fecha: '17/11/2016',
                referencia: 'csv CO.NA.PRO.LE. 10-2016 LTS:1.641,00 Prestación Pecuniaria 0,229 T/C:28,960 FechaTC:17/11/2016',
                debito: 0.00,
                credito: 12.98,
                saldo: -1320.10,
            },
            {
                idRegistro: 10424,
                fecha: '16/12/2016',
                referencia: 'csv CO.NA.PRO.LE. 11-2016 LTS:1.576,00 Prestación Pecuniaria 0,229 T/C:28,797 FechaTC:16/12/2016',
                debito: 0.00,
                credito: 12.53,
                saldo: -1307.57,
            },
            {
                idRegistro: 12271,
                fecha: '17/01/2017',
                referencia: 'csv CO.NA.PRO.LE. 12-2016 LTS:1.526,00 Prestación Pecuniaria 0,229 T/C:28,748 FechaTC:17/01/2017',
                debito: 0.00,
                credito: 12.16,
                saldo: -1295.41,
            },
            {
                idRegistro: 15113,
                fecha: '17/02/2017',
                referencia: 'csv CO.NA.PRO.LE. 01-2017 LTS:1.765,00 Prestación Pecuniaria 0,229 T/C:28,365 FechaTC:17/02/2017',
                debito: 0.00,
                credito: 14.25,
                saldo: -1281.16,
            },
            {
                idRegistro: 17376,
                fecha: '16/03/2017',
                referencia: 'csv CO.NA.PRO.LE. 02-2017 LTS:102,00 Prestación Pecuniaria 0,229 T/C:28,275 FechaTC:16/03/2017',
                debito: 0.00,
                credito: 0.83,
                saldo: -1280.33,
            }
        ],
        calculosSaldo: [
           
        ]
    
    }

    devuelvePrimerPagoPrestacion = (elemento) => {
        return elemento.credito > 0
    }

    

    calcularSaldo = () => {
        //Obtengo el Primer Pago de Prestacion
        let primerPagoPrestacion = this.state.cuentaCorriente.find(this.devuelvePrimerPagoPrestacion)
        let debitosDeCtaCte = this.devuelveArrayConDebitos
        
        for(let i=0; this.state.cuentaCorriente.length; i++) {
            this.setState({ 
                calculosSaldo: this.state.calculosSaldo.concat([debitosDeCtaCte])
              })
        }
        

        /*this.setState({ 
            calculosSaldo: this.state.calculosSaldo.concat([primerPagoPrestacion])
          })*/
        /*this.state.cuentaCorriente.map((ctaCteItem, index) =>{
            if(ctaCteItem.credito > 0) {
                return console.log('este index '+ index + ' es un credito ' + ctaCteItem.credito)
            } else if(ctaCteItem.debito > 0){
                return console.log('este index '+ index + ' es un debito ' + ctaCteItem.debito)
            }
            
            
        })*/
        console.log(primerPagoPrestacion)
        
    }


    render() {

        let cuentaCorriente = null;
        cuentaCorriente = (
            <div>
                <div className="divTable"  >
                    <div className="divTableBody">
                  
                    <div className="divTableRow">
                        <div className="divTableCell">Id Registro</div>
                        <div className="divTableCell">Indice</div>
                        <div className="divTableCell">Fecha</div>
                        <div className="divTableCell">Referencia</div>
                        <div className="divTableCell">Debito</div>
                        <div className="divTableCell">Credito</div>
                        <div className="divTableCell">Saldo</div>
                    </div>
            {
                this.state.cuentaCorriente.map((ctaCteItem, index) =>{
                    return (
                        <CtaCteItem

                            indice={index}
                            key={ ctaCteItem.idRegistro }
                            idRegistro={ ctaCteItem.idRegistro }
                            fecha={ ctaCteItem.fecha }
                            referencia={ ctaCteItem.referencia }
                            debito={ ctaCteItem.debito }
                            credito={ ctaCteItem.credito }
                            saldo={ ctaCteItem.saldo }
                            
                        />
                        
                    )
                })
            }
                   </div>
                </div>
            </div>
        );

    let calcularSaldoRender = null
    calcularSaldoRender =  (
        <div>
                <div className="divTable"  >
                    <div className="divTableBody">
                  
                    <div className="divTableRow">
                        <div className="divTableCell">Fecha</div>
                        <div className="divTableCell">Concepto</div>
                        <div className="divTableCell">Debe</div>
                        <div className="divTableCell">Haber</div>
                        <div className="divTableCell">Saldo</div>
                        <div className="divTableCell">TC</div>
                        <div className="divTableCell">Dias</div>
                        <div className="divTableCell">Interes</div>
                        <div className="divTableCell">PP $</div>
                    </div>
            {
                this.state.calculosSaldo.map((calculo, index) =>{
                    return (
                        <CalculoSaldo
                            fecha={ calculo.fecha }
                            referencia={ calculo.referencia }
                            debito={ calculo.debito }
                            credito={ calculo.credito }
                            saldo={ calculo.saldo }
                            tc='15'
                            dias='15'
                            interes='15'
                            pp='15'
                            
                        />
                        
                    )
                })
            }
                   </div>
                </div>
            </div>
    )


        return (

            <div>
                <h2>Calculo de intereses</h2>
                <p>Productor:  CURBELO RODRIGUEZ DENIS JAVIER</p>
                <p>RUT: 20280500011</p>
                <hr />
                <p>Tasa de interes anual	5%</p>
                <p>Tasa diaria efectiva:	0,000133681</p>
                <p>Industria:	CONAPROLE</p>
                <p>FIN DE REMISION: 	</p>

                <hr />
                <h2>Cuenta Corriente</h2>
                
                       { cuentaCorriente }
                    
                   
                <br />
                <h2 onClick={ this.calcularSaldo }>Calculo</h2>
                    { calcularSaldoRender }


            </div>
            
        );
    }
}

export default Home;