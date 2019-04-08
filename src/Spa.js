import React, { Component } from "react";
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './Home';


const style = {
    color: 'red'
}

let changeColor = (style) => {
        style.color = 'green';
        return style;
}   


class Spa extends Component {

 

    render() {
        return(
        <HashRouter>    
            <div>
                <h1 className="title">FFD<span style={changeColor(style)}>SAL</span> </h1>
                <ul className="header">
                    <li><NavLink exact to='/'>Home</NavLink></li>
                   
                </ul>
                <div className="content">
                    <Route exact path='/' component={Home}/>
                </div>
            </div>
        </HashRouter>
        );
    }
}

export default Spa;