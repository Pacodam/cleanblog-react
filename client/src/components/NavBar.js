import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";

import "./NavBar.css";
import { pages } from "../libs/pagesInfo";
import AuthService from '../services/auth.service';


//<a className="nav-link" href={`"${nav.href}"`}>
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
    };
    
    this.renderNavs = this.renderNavs.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  // TODO map navs
//   renderNavs() {
//     return pages.map((nav, index) => (
//       <div>
//       <li className="nav-item" key={index}>
//       <NavLink exact to={pages.home.href}>
//         {pages.home.name}
//       </NavLink>
//     </li>
// </div>

//     )
//     )
//   }

componentDidMount() {
 this.setState({ isAuth: this.props.isAuth});
}

componentDidUpdate(prevProps) {
  if (prevProps !== this.props) {
    this.setState({ isAuth: this.props.isAuth});
  }
}

handleRedirect() {
  AuthService.logout();
  this.props.isAuthenticated();
}

  // TODO : warning
  // index.js:1 Warning: Using Maps as children is not supported. Use an array of keyed ReactElements instead.
  renderNavs() {
    let pagesMap = new Map();
    pagesMap.set(
      <li className="nav-item" key={0}>
        <NavLink exact to={pages.home.href}>
          {pages.home.name}
        </NavLink>
      </li>
    );
    pagesMap.set(
      <li className="nav-item" key={1}>
        <NavLink exact to={pages.about.href}>
          {pages.about.name}
        </NavLink>
      </li>
    );
   {/*} pagesMap.set(
      <li className="nav-item" key={2}>
        <NavLink exact to={pages.sample_post.href}>
          {pages.sample_post.name}
        </NavLink>
      </li>
   ); */}
    pagesMap.set(
      <li className="nav-item" key={3}>
        <NavLink exact to={pages.contact.href}>
          {pages.contact.name}
        </NavLink>
      </li>
    );
    if (!this.state.isAuth) {
      pagesMap.set(
        <li className="nav-item" key={4}>
          <NavLink exact to={pages.new_user.href}>
            {pages.new_user.name}
          </NavLink>
        </li>
      );
      pagesMap.set(
        <li className="nav-item" key={5}>
          <NavLink onClick={this.handleAuth} exact to={pages.login.href}>
            {pages.login.name}
          </NavLink>
        </li>
      );
    }
    if (this.state.isAuth) {
      pagesMap.set(
        <li className="nav-item" key={6}>
          <NavLink exact to={pages.new_post.href}>
            {pages.new_post.name}
          </NavLink>
        </li>
      );
      pagesMap.set(
        <li className="nav-item" key={7}>
        <NavLink  onClick={this.handleRedirect} exact to={pages.home.href} >
        {pages.logout.name}</NavLink>
        </li>
      );
    }
    return pagesMap;
  }

  render() {
    // TODO: without centralized state (i.e Redux) how manage isauth?
    // maybe is better at this point use jwt or cookies instead of sessions?
   
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        id="mainNav"
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            Start Bootstrap
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">{this.renderNavs()}</ul>
          </div>
        </div>
      </nav>
    );
  }
}
