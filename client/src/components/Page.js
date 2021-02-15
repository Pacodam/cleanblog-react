import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Contents from './Contents';

export default class Page extends Component{
    
    render() {
        return(
            <div>
            <NavBar />
            <Contents />
            <Footer />
            </div>
        )
    }
}