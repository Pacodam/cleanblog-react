import React, { Component } from "react";
import Header from "../Header";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AuthService from '../../services/auth.service';
import ControlledEditor from '../form_components/ControlledEditor';
import EditorField from '../form_components/EditorField';
import { EditorState, convertToRaw } from "draft-js";
import { unemojify } from "node-emoji";
import draftToHtml from "draftjs-to-html";
import PostDataService from '../../services/post.service';

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      user: '',
      editorState: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    
  }

  componentDidMount() {
   this.setState({
     user : AuthService.getCurrentUser(),
     editorState: EditorState.createEmpty(),
    })

  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({[e.target.name] : e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const post = {
      id: this.state.user.id,
      title: this.state.title,
      body: this.state.body, 
    }
    console.log(post);
    PostDataService.post(post)
    .then((response) => {
      alert(response.data);
      this.setState({
        title: "",
        body: "",
        user: '',
        editorState: '',
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onEditorStateChange(editorState) {
    //console.log(editorState.getCurrentContent());
    const newValue = unemojify(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );

    //console.log(newValue);
    this.setState({ editorState, body: newValue });
  }


  render() {
    const name = this.props.location.pathname.replace("/", "");
    const { editorState } = this.state;
    return (
      <div>
        <Header name={name} photo={this.state.user.photo} />
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
                      value={this.state.title}
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
                editorState={editorState}
                placeholder='Type here...'
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                }}
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
