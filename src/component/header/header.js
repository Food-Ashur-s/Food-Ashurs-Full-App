/* eslint-disable no-unused-vars */


import React from 'react';
import '../header/header.scss';
import logo from '../../assest/mainLogo.PNG';
import {LoginContext} from '../auth/context.js';
// import ReactWOW from 'react-wow';
import WOW from 'wowjs';
import $ from 'jquery';
window.$ = window.jQuery = require('jquery');

const If = props => {
  return props.condition ? props.children : null;
};

class Header extends React.Component{
  static contextType = LoginContext;
  constructor(props){
    super(props);
    this.state = {
      isToggle : false,
    };
  }

  componentDidMount(){
    const wow = new WOW.WOW();
    wow.init();
  }
  handleClick = () =>{
    // this.setState( prevState => ({
    //   isToggle : !prevState.isToggle,
    // }));
    $(document).ready(function() {
      $(document).delegate('.open', 'click', function(event){
        $(this).addClass('oppenned');
        event.stopPropagation();
      });
      $(document).delegate('body', 'click', function(event) {
        $('.open').removeClass('oppenned');
      });
      $(document).delegate('.cls', 'click', function(event){
        $('.open').removeClass('oppenned');
        event.stopPropagation();
      });
    });
  };
  render(){

    return (
      <>
        <div className='header-containar'>
          <img src={logo}  className="wow fadeInLeft slower logo" height="50px" width="200px"/>
          <link rel="stylesheet" href="animate.min.css"></link>
          {/* <div className="wow pulse slower" data-wow-offset='50' data-wow-delay="0s" data-wow-iteration="500">
            <h1>Food Ashur's</h1>
          </div> */}
          <div  className="open" onClick={this.handleClick}>
            <span className="cls"></span>
            <span>
              <ul className="sub-menu ">
                <li>
                  <a href="#profile" title="profile">My Account</a>
                </li>
                <li>
                  <a href="#Donor" title="Donor">Donor</a>
                </li>
                <li>
                  <a href="#resipient" title="resipient">Order</a>
                </li>
                <li>
                  <a href="#aboutUs" title="aboutUs">About Us</a>
                </li>
                <li>
                  <If condition={this.context.loggedIn}>
                    <a onClick={this.context.logout} >Log Out!</a>
                  </If>
                  <If condition={!this.context.loggedIn}>
                    <a>Log In</a>
                  </If>
                  {/* <a href="#setting" title="setting">Log Out</a> */}
                </li>
              </ul>
            </span>
            <span className="cls"></span>
          </div>
        </div>
        <div className="div-fix"></div>
      </>
    );
  }
}

export default Header;