import React, { useRef, Component } from "react";
import Header from "../Header";
//import {posts} from "../../libs/posts";
import { NavLink } from "react-router-dom";
import PostDataService from "../../services/post.service";
import parse from "html-react-parser";
import UserDataService from "../../services/user.service";
import { OverlayTrigger, Overlay, Popover, Button } from "react-bootstrap";
import { emojify } from "node-emoji";
import AuthService from "../../services/auth.service";
//href in cleanblog: <a href="/post/<%= blogposts[i]._id%>">

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      isAuth: true,
      user: '',
    };
    this.loadData = this.loadData.bind(this);
    this.findUser = this.findUser.bind(this);
    const popoverRef = React.createRef();
    const overlayTriggerRef = React.createRef();
  }

  componentDidMount() {
    //this.isAuthenticated();
    const user = AuthService.getCurrentUser();
    console.log(user);
    if (user !== null){ 
        // this.setState({ user });
         this.loadData(user);
    }
  }

  isAuthenticated() {
    AuthService.verifyValidJWTToken()
      .then((response) => {
        this.setState({ isAuth: response.data.validToken });
      })
      .catch((error) => {
        console.log(error);
      });
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

  //TODO not loading from render
  findUser(userId) {
    UserDataService.get(userId)
      .then((response) => {
        return response.data.username;
      })
      .catch((response) => {
        console.log(response);
        return "undefined";
      });
  }

  async loadData(user) {
    await PostDataService.getByUserId(user.id)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          this.setState({
            posts: response.data,
            user,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  //TODO reference to overlayTrigger who is calling element in map ?
  renderPopover(body, index) {
    return (
      <Popover key={index}>
        <Popover.Title as="h3">Preview</Popover.Title>
        <Popover.Content>{body}</Popover.Content>
      </Popover>
    );
  }

  hidePreview() {
    console.log("out");
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
    //console.log(this.state.posts.length);
    // if (this.state.posts.length === 0) {
    //   return null;
    // }
    console.log("posts rend", this.state.posts);
    let postsMap = this.state.posts.map((post, index) => (
      <OverlayTrigger
        key={index}
        trigger={["hover", "hover"]}
        placement="bottom"
        overlay={
          <Popover>
            <Popover.Content>
              {parse(emojify(post.body.substr(0, 40)))}
            </Popover.Content>
          </Popover>
        }
      >
        <div className="post-preview">
          <NavLink to={`/sample_post/${post._id}`}>
            <h2 className="post-title">{post.title}</h2>
            {/*<h3 className="post-subtitle">{parse(post.body)}</h3>*/}
          </NavLink>
          <p className="post-meta">
            Posted by
            <a href="#">
              {"\u00A0"}
              {/*this.findUser(post.userId)*/}
              {"\u00A0"}
            </a>
            {new Date(post.datePosted).toDateString()}
          </p>
        </div>
      </OverlayTrigger>
    ));

    const name = this.props.location.pathname.replace("/", "");
    return (
      <div>
      {this.state.isAuth}
        {this.state.isAuth ? (
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
        ) : (
          <h1>Please register or login</h1>
        )}
      </div>
    );
  }
}
