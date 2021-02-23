import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import './theme/css/clean-blog.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'react-bootstrap';
import './theme/css/clean-blog.min.css';
import './theme/css/clean-blog.css';

//import Popper from 'popper.js';
//import "../public/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
