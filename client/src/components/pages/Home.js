import React, { Component } from "react";
import Header from "../Header";
//import {posts} from "../../libs/posts";
import { NavLink } from "react-router-dom";
import PostDataService from '../../services/post.service';
import parse from 'html-react-parser';

//href in cleanblog: <a href="/post/<%= blogposts[i]._id%>">

export default class Home extends Component {
  constructor(){
    super();
    this.state = {
      posts: '',
    }
    this.loadData = this.loadData.bind(this);
  }

   componentDidMount() {
     this.loadData();
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch },
    } = prevProps;
    const {
      location: { search },
    } = this.props;
    if (prevSearch !== search) {
      this.loadData();
    }
  }


    async loadData() {
     await PostDataService.getAll()
    .then((response) => {
      if(response.data) {
        this.setState({
          posts: response.data,
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
  }

  render() {
    // const postsMap = posts.map((post, index) => (
    //   <div className="post-preview" key={index}>
    //     <a href={`"${post.href}"`}>
    //       <h2 className="post-title">{post.title}</h2>
    //       <h3 className="post-subtitle">{post.body}</h3>
    //     </a>
    //     <p className="post-meta">
    //       Posted by
    //       <a href="#">{'\u00A0'}{post.postedBy}{'\u00A0'}</a>
    //       {post.datePosted.toDateString()}
    //     </p>
    //   </div>
    // ));
    //TODO better way to not render until data is fetched
   if(typeof this.state.posts === "string"){
     return null;
   }
    
    let postsMap = this.state.posts.map((post, index) => (
      <div className="post-preview" key={index}>
        <NavLink to={`/sample_post/${post._id}`}>
          <h2 className="post-title">{post.title}</h2>
          <h3 className="post-subtitle">{parse(post.body)}</h3>
        </NavLink>
        <p className="post-meta">
          Posted by
          <a href="#">{'\u00A0'}{post.postedBy}{'\u00A0'}</a>
          {new Date(post.datePosted).toDateString()}
        </p>
      </div>
    ))
   

    const name = this.props.location.pathname.replace("/", "");
    return (
      <div>
        <Header name={name} />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">{postsMap}</div>
          </div>

          <div className="clearfix">
            <a className="btn btn-primary float-right" href="#">
              Older Posts &rarr;
            </a>
          </div>
        </div>
      </div>
    );
  }
}
