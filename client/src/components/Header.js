import React, { Component } from 'react';
//TODO: every image name should be passed as prop since some are repeated
import BackgroundImage from '../theme/img/home-bg.jpg';
//import imagePath from '../../../images/';
import './Header.css';
import { getPageInfo } from '../libs/pagesInfo';

const path = '../theme/img/';

export default class Header extends Component{
  constructor() {
    super();
    this.state = {
      photo: '',
    }
  }
  componentDidMount() {
    if(this.props.photo){
          this.setState({ photo: this.props.photo});
    }
  }
    render() {
        const header = getPageInfo(this.props.name)
      
        return(
            <header className="masthead" id="banner" style={{background: `url("${path + header.img}")`}}>
            <div className="overlay"></div>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <div className="site-heading">
                    <h1>{header.headerTitle}</h1>
                    <span className="subheading">{header.headerSubtitle}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
        )
    }
}

{/*<header className="masthead" id="banner" style={{background: "url(" + { BackgroundImage } + ")"}}> */}