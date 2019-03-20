import React, { Component } from "react";
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './Home';
import Resume from './Resume';
import Contact from './Contact';


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
                <h1 className="title">MAURI<span style={changeColor(style)}>dot</span>SOFTWARE </h1>
                <ul className="header">
                    <li><NavLink exact to='/'>Home</NavLink></li>
                    <li><NavLink to="/resume">Resume</NavLink></li>
                    <li><NavLink to="/getintouch">Get in touch</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path='/' component={Home}/>
                    <Route path='/resume' component={Resume}/>
                    <Route path='/getintouch' component={Contact}/>
                </div>
            </div>
        </HashRouter>
        );
    }
}

export default Spa;