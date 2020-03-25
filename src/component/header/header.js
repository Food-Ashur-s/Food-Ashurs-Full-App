/* eslint-disable no-unused-vars */


import React from 'react';
import '../header/header.scss';
import logo from '../../assest/mainLogo.PNG';
import {LoginContext} from '../auth/context.js';
// import ReactWOW from 'react-wow';
import WOW from 'wowjs';
import SignForm from '../sign-forms/signForm.js';
import $ from 'jquery';
import {When} from '../if/index.js';
import AOS from 'aos';
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
      showSignForm : false,
    };
  }

  componentDidMount(){
    AOS.init();
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
  handleSignClick =() => {
    this.setState(state =>({showSignForm : true}));
    console.log(this.state);
  }
  closeSignForm =() => {
    this.setState(state =>({showSignForm : false}));
  }
  render(){

    return (
      <>
        <div className='header-containar'>
          <img src={logo}  className="wow fadeInLeft slower logo" height="65px" width="200px"/>
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
                    <a onClick={this.handleSignClick}>Log In</a>
                    {/* <button onClick={this.handleSignClick} className="signForm-button" >
            SignIn</button> */}
                  </If>
                  {/* <a href="#setting" title="setting">Log Out</a> */}
                </li>
              </ul>
            </span>
            <span className="cls"></span>
          </div>
        </div>
        <div className="div-fix"></div>
        <When condition={this.state.showSignForm}>
          <SignForm close={this.closeSignForm}  />
        </When>
        <If condition={!this.context.loggedIn}>
          <button onClick={this.handleSignClick} data-aos="fade-up" data-aos-duration="2000" className="signForm-button" >
            SignIn</button>
        </If>
        <div className="header-page">

        </div>
        <div className="quotes-div">
          <div ><p data-aos="flip-up" className="quote">Food Charty</p></div>
          <div><p  data-aos="flip-down" className="quote">Donation</p></div>
          <div><p data-aos="flip-up" className="quote">Humanity</p></div>
          <div><p data-aos="flip-down" className="quote">Help ...</p></div>
        </div>
        <div className="clear-div"></div>
      </>
    );
  }
}

export default Header;
