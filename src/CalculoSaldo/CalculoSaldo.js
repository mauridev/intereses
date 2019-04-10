import React, { Component } from 'react';

class CalculoSaldo extends Component {

render() {    
    return (
        <div className="divTableRow">
                    <div className="divTableCell">{ this.props.fecha }</div>
                    <div className="divTableCell">{ this.props.referencia }</div>
                    <div className="divTableCell">{ this.props.debito }</div>
                    <div className="divTableCell">{ this.props.credito }</div>
                    <div className="divTableCell">{ this.props.saldo }</div>
                    <div className="divTableCell">{ this.props.tc }</div>
                    <div className="divTableCell">{ this.props.dias }</div>
                    <div className="divTableCell">{ this.props.interes }</div>
                    <div className="divTableCell">{ this.props.pp }</div>
        </div>
    )
}

}
export default CalculoSaldo;