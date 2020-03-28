/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { LoginContext } from './auth/context.js';
import cartPhoto from '../assets/profile-picture.jpg';
import logo from '../assest/mainLogo.PNG';
// import {LoginContext} from '../auth/context.js';
import {Link , NavLink} from 'react-router-dom';
// import ReactWOW from 'react-wow';
import WOW from 'wowjs';
// import SignForm from '../sign-forms/signForm.js';
import $ from 'jquery';
// import {When} from '../if/index.js';
import AOS from 'aos';
window.$ = window.jQuery = require('jquery');



const If = props => {
  return props.condition ? props.children : null;
};

class Profile extends Component {
    static contextType = LoginContext;

    constructor(props) {
      super(props);
      this.state = {
        isToggle : false,
        showSignForm : false,
        image: cartPhoto,
        showUpload: false,
      };

      this.onImageChange = this.onImageChange.bind(this);
    }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img),
      });
      // localStorage.setItem('myphoto', this.state.image);
      // this.setState({image:localStorage.getItem('myphoto') || cartPhoto});
      this.setState({showUpload:!this.state.showUpload});
    }
  };
  showingUpload = e => {
    e.preventDefault();
    this.setState({showUpload:!this.state.showUpload});
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

  render() {
    return (
      <div>
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
                  <Link to='/Food-Ashur-s/Food-Ashurs-Full-App'>Home</Link>
                </li>
                <li>
                  <NavLink to='/profile'>profile</NavLink>
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

        <h1>My Profile</h1>
        <ul>
          {this.state.showUpload && (<input type="file" name="myImage" onChange={this.onImageChange} />)}
          {!this.state.showUpload && (<button onClick={this.showingUpload}>Edit My Photo</button>)}
          <img src={this.state.image} height="200" width="200"/>
          <li>{this.context.user.username}</li>
          <li>{this.context.user.capabilities}</li>
          <li>{this.context.user.userEamil}</li>
        </ul>
      </div>
    );
  }
}
export default Profile;