import React, { Component } from "react";
import BackgroundImage from "../../theme/img/post-bg.jpg";
import PostDataService from "../../services/post.service";
import UserDataService from "../../services/user.service";
import parse from "html-react-parser";
import { emojify } from "node-emoji";

export default class SamplePost extends Component {
  constructor() {
    super();
    this.state = {
      post: "",
      username: "",
    };

    this.loadData = this.loadData.bind(this);
    this.findUser = this.findUser.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    await PostDataService.get(id)
      .then((response) => {
        const post = response.data;

        this.findUser(post.userId);
        //const username =  this.findUser(post.userId);
        //console.log("in" ,username);
        this.setState({ post: post });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findUser(userId) {
    console.log(userId);
    UserDataService.get(userId)
      .then((response) => {
        this.setState({ username: response.data.username });
        //return response.data.username;
      })
      .catch((response) => {
        this.setState({ username: "undefined" });
      });
  }

  render() {
    if (typeof this.state.post === "string") {
      return null;
    }
    const { post, username } = this.state;

    const header = (
      <header
        className="masthead"
        style={{ backgroundImage: "url(" + { BackgroundImage } + ")" }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="post-heading">
                <h1>{post.title}</h1>
                {/*<h2 className="subheading">{post.body}</h2>*/}
                <span className="meta">
                  Posted by
                  <a href="#">
                    {"\u00A0"}
                    {username}
                    {"\u00A0"}
                  </a>
                  {new Date(post.datePosted).toDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );

    const body = (
      <article>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">{parse(emojify(post.body))}</div>
          </div>
        </div>
      </article>
    );
    return (
      <div>
        {header}
        {body}
      </div>
    );
  }
}
