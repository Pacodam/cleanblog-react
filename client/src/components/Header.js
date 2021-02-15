import React, { Component } from 'react';
//TODO: every image name should be passed as prop since some are repeated
import BackgroundImage from '../theme/img/home-bg.jpg';
import './Header.css';
import { getPageInfo } from '../libs/pagesInfo';

export default class Header extends Component{
    render() {
        const header = getPageInfo(this.props.name)
        return(
            <header className="masthead" style={{backgroundImage: "url(" + { BackgroundImage } + ")"}}>
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