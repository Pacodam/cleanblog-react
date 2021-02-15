//https://hackernoon.com/setting-up-a-serverless-contact-form-in-react-using-nodemailer-and-express-19df9fdb20ed
//https://medium.com/@RistaSB/use-expressjs-to-send-mails-with-gmail-oauth-2-0-and-nodemailer-d585bba71343
//https://stackoverflow.com/questions/60050129/gmail-blocks-nodemailer-from-sending-mail

import React, { Component } from "react";
import axios from 'axios';
import Header from "../Header";

export default class NewUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      message: "",
      buttonText: "Send",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ buttonText: '...sending' })

    let data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      message: this.state.message,
    }

    console.log("data", data);

    axios.post('http://localhost:8000/api/contact', data)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

    this.setState({
      name: "",
      email: "",
      phone: "",
      message: "",
      buttonText: "Message sent",
    })
  }

  render() {
    const name = this.props.location.pathname.replace("/", "");
    return (
      <div>
        <Header name={name} />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <p>
                Want to get in touch? Fill out the form below to send me a
                message and I will get back to you as soon as possible!
              </p>
              <form onSubmit={this.handleSubmit} >
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      id="name"
                      name="name"
                      required
                      data-validation-required-message="Please enter your name."
                      onChange={this.handleChange}
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                </div>

                <div className="control-group">
                  <div className="form-group floating-label-form-group controls">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      id="email"
                      name="email"
                      required
                      data-validation-required-message="Please enter your email address."
                      onChange={this.handleChange}
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                </div>

                <div className="control-group">
                  <div className="form-group col-xs-12 floating-label-form-group controls">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                      id="phone"
                      name="phone"
                      required
                      data-validation-required-message="Please enter your phone number."
                      onChange={this.handleChange}
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                </div>

                <div className="control-group">
                  <div className="form-group floating-label-form-group controls">
                    <label>Message</label>
                    <textarea
                      rows="5"
                      className="form-control"
                      placeholder="Message"
                      id="message"
                      name="message"
                      required
                      data-validation-required-message="Please enter a message."
                      onChange={this.handleChange}
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                </div>

                <br></br>
                <div id="success"></div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="sendMessageButton"
                >
                  {this.state.buttonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
