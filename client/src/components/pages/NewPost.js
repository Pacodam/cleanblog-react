import React, { Component } from "react";
import Header from "../Header";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  onEditorStateChange(e) {
    console.log(e.target.value);
  }

  render() {
    const name = this.props.location.pathname.replace("/", "");
    return (
      <div>
        <Header name={name} />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      id="title"
                      name="title"
                      value=""
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
                <br></br>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls">
                    <label>Description</label>

                    <Editor
                      editorState=""
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={this.onEditorStateChange}
                    />
                
                  </div>
                </div>
                <br />
                <div id="success"></div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="sendMessageButton"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
