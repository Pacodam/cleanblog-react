import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import NewPost from "./pages/NewPost";
import NewUser from "./pages/NewUser";
import Contact from "./pages/Contact";
import SamplePost from "./pages/SamplePost";
import Login from "./pages/Login";

const NotFound = () => <h1>Page Not Found</h1>;

export default class Contents extends React.Component {
  render() {
   
    return (
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/new_post" component={NewPost} />
        <Route path="/new_user" component={NewUser} />
        <Route path="/contact" component={Contact} />
        <Route path="/logn" component={Login} />
        <Route path="/login" render={props => <Login navTo="login" isAuthenticated= {this.props.isAuthenticated} />} />
        <Route path="/sample_post/:id" component={SamplePost} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

//<Route path="/life" render={props => <Life sayHello = {this.sayHello} />} />
