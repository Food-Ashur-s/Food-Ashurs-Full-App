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
import Model from './modal';
import './profile.scss';
import {When} from './if';
import Gauge from 'react-svg-gauge';
import ReactSpeedometer from 'react-d3-speedometer';
import GaugeChart from 'react-gauge-chart';


window.$ = window.jQuery = require('jquery');



const If = props => {
  return props.condition ? props.children : null;
};



class Profile extends Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      image: localStorage.getItem('myphoto') || cartPhoto,
      showUpload: false,
      isToggle : false,
      showSignForm : false,
      user: JSON.parse(localStorage.getItem('userInfo')),
      showUserUpdate: false,
      updated:{ username:'', userEamil:'' , capabilities: ''},
      updateList: JSON.parse(localStorage.getItem('newUser')),
      showUpdateList: JSON.parse(localStorage.getItem('showNewUser')),
    };

    this.onImageChange = this.onImageChange.bind(this);
  }

onImageChange = event => {
  if (event.target.files && event.target.files[0]) {
    let img = event.target.files[0];
    // this.setState({
    //   image: URL.createObjectURL(img),
    // });
    localStorage.setItem('myphoto', URL.createObjectURL(img));
    this.setState({image: localStorage.getItem('myphoto')});
    this.setState({showUpload:!this.state.showUpload});
  }
};
showingUpload = e => {
  e.preventDefault();
  this.setState({showUpload:!this.state.showUpload});
}

handleChange = e => {
  this.setState({updated:{...this.state.updated, [e.target.name] : e.target.value }});
}

handelShowUserUpdate = e => {
  e.preventDefault();
  let showUserUpdate = !this.state.showUserUpdate;
  this.setState({showUserUpdate:showUserUpdate});
  console.log(this.state.showUserUpdate);
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
    <React.Fragment>

      <div className='header-containar'>
        <img src={logo}  className="wow fadeInLeft slower logo" height="65px" width="200px"/>
        <link rel="stylesheet" href="animate.min.css"></link>
        <div className="wow pulse slower" data-wow-offset='50' data-wow-delay="0s" data-wow-iteration="500">
          {/* <h1 className="food">Food Ashur's</h1> */}
        </div>
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
      <main class="page__course">
        <div class="container">
          <div class="course-content">
            <h2 className="namm">{this.state.user.username } Profile</h2>
            <div class="content-block">
              <div className="cir">
                <GaugeChart id="gauge-chart2"
                  nrOfLevels={20}
                  percent={0.86}
                  // colors={['#0b7685dc' , 'yellow' , 'yellow']}
                />

                <GaugeChart id="gauge-chart3"
                  nrOfLevels={30}
                  colors={['#0b7685dc', '#FFC371']}
                  arcWidth={0.3}
                  percent={0.37}
                />
              </div>
              <span class="rat">rating</span>
              <span class="stars">★★★★☆</span>
            </div>


            <div class="content-block">
              {!this.showUserUpdate && (<button onClick={this.handelShowUserUpdate} class="btn11">Update</button>)}

              {/* <a class="button button--booking">Book Course</a> */}
              {/* <a class="button button--download">Download PDF</a> */}

            </div>
            <When condition={this.state.showUserUpdate}>
              <Model title='user update' close={this.handelShowUserUpdate}>
                <div className="user-updated">
                  <form onSubmit={ e =>{
                    localStorage.setItem('newUser', JSON.stringify(this.state.updated));
                    this.setState({updateList: localStorage.setItem('newUser', JSON.stringify(this.state.updated))});
                    this.setState({showUserUpdate: localStorage.setItem('showNewUser', JSON.stringify(true))});
                  }} value={this.updated}>
                    <label> Your Name is:
                      <input type='text' name='username' placeholder='type your name' defaultValue={this.state.user.username} onChange={this.handleChange} required />
                      <br/>
                    </label>
                    <label> Your role is:
                      <input type='text' name='capabilities' placeholder='type your name' defaultValue={this.state.user.capabilities} onChange={this.handleChange} required />
                      <br/>
                    </label>
                    <label> Your Email is:
                      <input type='text' name='userEamil' placeholder='type your name' defaultValue={this.state.user.userEamil} onChange={this.handleChange} required />
                      <br/>
                    </label>
                    <button >Submit</button>
                  </form>
                </div>
              </Model>
            </When>



            <div class="content-block">
              <ul id="tabs">
                <li class="active">Description</li>


              </ul>


              <ul id="tab">
                <li className="active">
                  <p>{this.state.updated.username ||  this.state.user.username } is one of the distinguished users of this website and the people who contribute to spreading goodness on Earth.</p>

                </li>


              </ul>
            </div>
          </div>
          <aside class="courseSidebar">
            <div className="masthead">
              <img src={this.state.image} className="avatar"/>
            </div>


            <div className="change">
              {this.state.showUpload && (<input type="file" name="myImage" class="btn1" onChange={this.onImageChange} />)}
              {!this.state.showUpload && (<button class="btnz" onClick={this.showingUpload}>Edit My Photo</button>)}
            </div>

            {!this.state.showUpdateList && (
              <ul class="courseStats">
                <li>
                  <span class="label courseStats__label" >User name</span>
                  <span class="courseStats__divider"></span>
                  <span class="courseStats__data">{this.state.user.username }</span>
                </li>
                <li>
                  <span class="label courseStats__label">TYpe</span>
                  <span class="courseStats__divider"></span>
                  <span class="courseStats__data">{this.state.user.capabilities }</span>
                </li>
                <li>
                  <span class="label courseStats__label">E-mail</span>
                  <span class="courseStats__divider"></span>
                  <span class="courseStats__data">{this.state.user.userEamil }</span>
                </li>

              </ul>
            )}
            {this.state.showUpdateList && (
              <ul class="courseStats">
                <li>
                  <span class="label courseStats__label" >User name</span>
                  <span class="courseStats__divider"></span>
                  <span class="courseStats__data">{this.state.updated.username || this.state.updateList.username || this.state.user.username }</span>
                </li>
                <li>
                  <span class="label courseStats__label">TYpe</span>
                  <span class="courseStats__divider"></span>
                  <span class="courseStats__data">{this.state.updated.capabilities || this.state.updateList.capabilities || this.state.user.capabilities }</span>
                </li>
                <li>
                  <span class="label courseStats__label">E-mail</span>
                  <span class="courseStats__divider"></span>
                  <span class="courseStats__data">{this.state.updated.userEamil || this.state.updateList.userEamil || this.state.user.userEamil }</span>
                </li>

              </ul>
            )}
          </aside>
        </div>
      </main>

    </React.Fragment>
  );
}
}
export default Profile;































