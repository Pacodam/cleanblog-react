import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Contents from './Contents';

export default class Page extends Component{
    constructor(){
        super();
        this.state = {
            isAuth : false,
        }
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }
    isAuthenticated() {
        console.log("pageeeeis auth");
        this.setState({isAuth : true});
        console.log("new isAuth: ", this.state.isAuth)
    }
  
    render() {
        console.log("page")
        return(
            <div>
            <NavBar isAuth= {this.state.isAuth}/>
            <Contents pepito="pepito" isAuthenticated={this.isAuthenticated}/>
            <Footer />
            </div>
        )
    }
}