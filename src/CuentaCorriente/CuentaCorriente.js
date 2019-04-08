import React, { Component } from 'react';

class CuentaCorriente extends Component {

    

    render(props){

        return (
            <div>
                <table>
                <tr>
                                <th>Id Registro</th>
                                <th>Fecha</th>
                                <th>Id Registro Referencia</th>
                                <th>Referencia</th>
                                <th>Debito</th>
                                <th>Credito</th>
                </tr>
                { this.state.cuentaCorriente.map( (cuenta) => {
                   return ( 
                            
                            <tr>
                                <td>{cuenta.FECHA}</td>
                                <td>{cuenta.IdRegistro_2}</td>
                                <td>{cuenta.REFERENCIA}</td>
                                <td>{cuenta.DEBITO}</td>
                                <td>{cuenta.CREDITO}</td>
                            </tr>
                        )     
                }
                )}
                </table>   
            </div>
        );
    }
}

export default CuentaCorriente;