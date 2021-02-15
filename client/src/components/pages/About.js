import React, {Component} from 'react';
import Header from '../Header';

export default class About extends Component {
    render() {  
    const name = this.props.location.pathname.replace("/", "");
        return(
            <div>
            <Header name={name} />
            <h1>About</h1>
           </div>
        )
    }}