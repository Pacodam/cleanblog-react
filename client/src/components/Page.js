import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Contents from './Contents';
import AuthService from '../services/auth.service';

export default class Page extends Component{
    constructor(){
        super();
        this.state = {
            isAuth : false,
        }
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    //for now, just look if there is a "user" in localstorage... should be done better
    isAuthenticated() {
       AuthService.getCurrentUser() !== null
        ?  this.setState({isAuth : true})
        : this.setState({isAuth: false})

    }
  
    render() {
        return(
            <div>
            <NavBar isAuth= {this.state.isAuth} isAuthenticated={this.isAuthenticated}/>
            <Contents  isAuthenticated={this.isAuthenticated}/>
            <Footer />
            </div>
        )
    }
}