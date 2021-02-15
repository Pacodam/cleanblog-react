import React, { Component } from "react";
import Header from "../Header";
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class NewPost extends Component {
  render() {
    const name = this.props.location.pathname.replace("/", "");
    return (
      <div>
        <Header name={name} />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <form
                action="/posts/store"
                method="POST"
                enctype="multipart/form-data"
              >
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
                      required
                    />
                  </div>
                </div>
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
                    {/*  <script>
                  $("#body").summernote({
                    placeholder: "Description",
                    tabsize: 2,
                    height: 200,
                  });
                </script> */}
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls">
                    <label>Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      value=""
                      required
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
