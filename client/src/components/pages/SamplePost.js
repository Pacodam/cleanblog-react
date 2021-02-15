import React, { Component } from "react";
import BackgroundImage from "../../theme/img/post-bg.jpg";
import PostDataService from "../../services/post.service";
import parse from 'html-react-parser';

export default class SamplePost extends Component {
  constructor() {
    super();
    this.state = {
      post: "",
    };

    this.loadData = this.loadData.bind(this);
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
        this.setState({ post: post });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {

    if(typeof this.state.post === "string"){
      return null;
    }
    const { post } = this.state;
  

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
                  <a href="#">{post.postedBy}</a>
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
            <div className="col-lg-8 col-md-10 mx-auto">
              {parse(post.body)}
            </div>
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
