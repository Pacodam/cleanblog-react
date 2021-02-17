// https://dev.to/yosraskhiri/how-to-upload-an-image-using-mern-stack-1j95

import React, { Component } from "react";
import Header from "../Header";
import { TextInput, PasswordInput } from "../form_components/FormInputs";
import { ImageUploadInput } from "../form_components/ImageUploadInput";
import { FileUploader } from "../form_components/FileUploader";
import PostDataService from "../../services/post.service";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", photo: null, redirect: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handlePhoto(evt) {
    //TODO https://dev.to/yosraskhiri/make-an-image-preview-in-react-js-301f
    console.log("targetPho ", evt.target.files);
    this.setState({ photo: evt.target.files[0] });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("photo", this.state.photo);
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);

    await axios({
      method: "post",
      url: "http://localhost:8000/api/blogposts",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        //handle success
        console.log(response);
        //this.setState({ username: "", password: "", photo: null, imageKey: Date.now() });
        this.setState({ redirect: true });
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    // axios.post('http://localhost:8000/api/blogposts/', formData)
    //        .then(res => {
    //           console.log(res);
    //        })
    //        .catch(err => {
    //           console.log(err);
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
