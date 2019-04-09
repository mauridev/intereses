import React, { Component } from 'react';

class CtaCteItem extends Component {

    

    render(){

        return (
            <div className="divTableRow">
                <div className="divTableCell">{ this.props.idRegistro }</div>
                <div className="divTableCell"><input defaultValue={this.props.indice} /></div>
                <div className="divTableCell">{ this.props.fecha }</div>
                <div className="divTableCell">{ this.props.referencia }</div>
                <div className="divTableCell">{ this.props.debito }</div>
                <div className="divTableCell">{ this.props.credito }</div>
                <div className="divTableCell">{ this.props.saldo }</div>
                
            </div>
        );
    }
}

export default CtaCteItem;