import React, { Component } from "react";
import Header from "../Header";
import { TextInput, PasswordInput } from "../form_components/FormInputs";
import UserDataService from "../../services/user.service";
import AuthService from '../../services/auth.service';
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", redirect: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
   
     const username =  this.state.username;
     const password = this.state.password;
  

    await AuthService.login(username, password)
      .then((response) => {
        this.setState({ redirect: true });
        this.props.isAuthenticated();
      })
      .catch((err) => {
        console.log(err.message);
      });
    // evt.preventDefault();
    // const user = {
    //   username: this.state.username,
    //   password: this.state.password,
    // };

    // await AuthService.login(user)
    //   .then((response) => {
    //     this.setState({ redirect: true });
    //     this.props.isAuthenticated();
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }

  render() {
    //console.log("in login", this.props.handleAuth)
    let name = "login";
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Header name={name} />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <form onSubmit={this.handleSubmit}>
                <TextInput
                  placeholder="User name"
                  value={this.state.username}
                  name="username"
                  id="username"
                  onChange={this.handleChange}
                  required={true}
                />
                <PasswordInput
                  placeholder="Password"
                  value={this.state.password}
                  name="password"
                  id="password"
                  onChange={this.handleChange}
                  required={true}
                />
                <br></br>
                <div id="success"></div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="sendMessageButton"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
