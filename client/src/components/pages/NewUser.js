// https://dev.to/yosraskhiri/how-to-upload-an-image-using-mern-stack-1j95

import React, { Component } from "react";
import Header from "../Header";
import { TextInput, PasswordInput } from "../form_components/FormInputs";
import { ImageUploadInput } from "../form_components/ImageUploadInput";
import { FileUploader } from "../form_components/FileUploader";
import PostDataService from "../../services/post.service";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";

export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: "",
      photo: null,
      redirect: false,
      showPasswordAlert: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
  }

  handleChange(evt) {
   
    this.setState({ [evt.target.name]: evt.target.value, showPasswordAlert: false, });
  }

  handlePhoto(evt) {
    //TODO https://dev.to/yosraskhiri/make-an-image-preview-in-react-js-301f
    this.setState({ photo: evt.target.files[0] });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.password1 !== this.state.password2) {
      console.log("Passwords don't match!");
      this.setState({ showPasswordAlert: true});
      return;
    }
    console.log(this.state);
    let formData = new FormData();
    formData.append("photo", this.state.photo);
    formData.append("username", this.state.username);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password1);

    console.log(formData);

    await axios({
      method: "post",
      url: "http://localhost:8000/api/users",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        //handle success
        //this.setState({ username: "", password: "", photo: null, imageKey: Date.now() });
        this.setState({ redirect: true });
      })
      .catch(function (response) {
        console.log("error");
        //handle error
      });

    // axios.post('http://localhost:8000/api/blogposts/', formData)
    //        .then(res => {
    //        })
    //        .catch(err => {
    //        });
  }

  //      //save to api
  //      PostDataService.post(formData)
  //      .then(res => {
  //        console.log(res);
  //      })
  //      .catch(err => {
  //        console.log(err);
  //      })

  //

  // }

  setPasswordShow(show){
    this.setState({ showPasswordAlert: show});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    const name = this.props.location.pathname.replace("/", "");

    return (
      <div>
        <Header name={name} />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <TextInput
                  placeholder="User name"
                  type="text"
                  value={this.state.username}
                  name="username"
                  id="username"
                  onChange={this.handleChange}
                  required={true}
                />
                <br></br>
                <TextInput
                  placeholder="Email"
                  type="email"
                  value={this.state.email}
                  name="email"
                  id="email"
                  onChange={this.handleChange}
                  required={true}
                />
                <br></br>
                <PasswordInput
                  placeholder="Password"
                  value={this.state.password1}
                  name="password1"
                  id="password1"
                  onChange={this.handleChange}
                  required={true}
                />
                <br></br>
                <PasswordInput
                  placeholder="Repeat Password"
                  value={this.state.password2}
                  name="password2"
                  id="password2"
                  onChange={this.handleChange}
                  required={true}
                />
                <Alert show={this.state.showPasswordAlert} variant="danger" onClose={() => this.setPasswordShow(false)} dismissible>Passwords don't match!</Alert>
                <br></br>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="photo"
                  id="photo"
                  key={this.state.imageKey}
                  onChange={this.handlePhoto}
                />
                <br></br>
                <div id="success"></div>
                <br></br>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="sendMessageButton"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
