import React, { Component } from "react";

class Spa extends Component {
    render() {
        return(
        <div>
            <h1>Simple SPA</h1>
            <ul className="header">
                <li><a href="/">Home</a></li>
                <li><a href="/resume">Resume</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            <div className="content">
            
            </div>
        </div>
        );
    }
}

export default Spa;