// https://codesandbox.io/s/q4lp8jkmnw?file=/ControlledEditor.js:0-838

import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import { unemojify } from "node-emoji";

export default class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.props.onChange(
      draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    );
  }

  onEditorStateChange: Function = editorState => {
    const { onChange, value } = this.props;

    const newValue = unemojify(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );

    if (value !== newValue) {
      onChange(newValue);
    }

    this.setState({
      editorState
    });
  };