/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { LoginContext } from './auth/context.js';
import GaugeChart from 'react-gauge-chart';

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
      user: JSON.parse(localStorage.getItem('userInfo')),
      showUserUpdate: false,
      updated:{},
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

render() {
  return (
    <React.Fragment>
      <main class="page__course">
        <div class="container">


          <div class="course-content">

            <h1>Managing Work at Height</h1>

            <div class="content-block">
              <span class="label">HoundRank</span>
              <span class="stars">★★★☆☆</span>
            </div>

            <div class="content-block">
              <a class="button button--booking">Book Course</a>
              <a class="button button--download">Download PDF</a>
            </div>

            <div class="content-block">
              <ul id="tabs">
                <li class="active">Description</li>
             

              </ul>


              <ul id="tab">
                <li class="active">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Moatibus amet quisquam accus, porro, alias sed distinctio. necessitatibus amet quisquam accusamus minus rederit cum dolores ab ratione, porro, alias sed distinctio.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing asd. Modi quo, culpa susc ipsum assumenda odio doloribus necessitatibus amequam porro, alias sed distinct. necessitatibus quisquam accusamus minus reprehenderit cum dolores ab ratione, porro,as
              sed distinctio.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi quo, culpa susc ipsum assumes sed distinct. necessitatibuo joij oij bhuohb ouyone, porro,as sed distinctio.</p>
                </li>


              </ul>
            </div>
          </div>
          <aside class="courseSidebar">
            <img className="person" src={this.state.image } />
            <div className="changephoto">
            
              {this.state.showUpload && (<input type="file" name="myImage" className="bt" onChange={this.onImageChange} />)}
              {!this.state.showUpload && (<button onClick={this.showingUpload}>Edit My Photo</button>)}
            </div>


            <ul class="courseStats">
              <li>
                <span class="label courseStats__label">Provider</span>
                <span class="courseStats__divider"></span>
                <span class="courseStats__data">Leading Edge Safety</span>
              </li>
              <li>
                <span class="label courseStats__label">Duration</span>
                <span class="courseStats__divider"></span>
                <span class="courseStats__data">Half Day</span>
              </li>
              <li>
                <span class="label courseStats__label">Suitable For</span>
                <span class="courseStats__divider"></span>
                <span class="courseStats__data">Managers</span>
              </li>
              <li>
                <span class="label courseStats__label">Subject</span>
                <span class="courseStats__divider"></span>
                <span class="courseStats__data">Working At Height</span>
              </li>
            </ul>
          </aside>
        </div>
      </main>
   
    </React.Fragment>
  );
}
}
export default Profile;

















// {this.state.showUpload && (<input type="file" name="myImage" onChange={this.onImageChange} />)}
// {!this.state.showUpload && (<button onClick={this.showingUpload}>Edit My Photo</button>)}

//   <div className="profilecon">
//   <h1>My Profile</h1>
//   <img src={this.state.image } height="200" width="200"/>
//   {!this.state.showUpdateList && (
//     <ul>
//       <li>{this.state.user.username }</li>
//       <li>{this.state.user.capabilities }</li>
//       <li>{this.state.user.userEamil }</li>
//     </ul>
//   )}
//   {this.state.showUpdateList && (
//     <ul>
//       <li>{this.state.updated.username || this.state.updateList.username}</li>
//       <li>{this.state.updated.capabilities || this.state.updateList.capabilities}</li>
//       <li>{this.state.updated.userEamil || this.state.updateList.userEamil}</li>
//     </ul>
//   )}

//   {!this.showUserUpdate && (<button onClick={this.handelShowUserUpdate}>Updae</button>)}

//   <When condition={this.state.showUserUpdate}>
//     <Model title='user update' close={this.handelShowUserUpdate}>
//       <div className="user-updated">
//         <form onSubmit={ e =>{
//           localStorage.setItem('newUser', JSON.stringify(this.state.updated));
//           this.setState({updateList: localStorage.setItem('newUser', JSON.stringify(this.state.updated))});
//           this.setState({showUserUpdate: localStorage.setItem('showNewUser', JSON.stringify(true))});
//         }} value={this.updated}>
//           <label> Your Name is:
//             <input type='text' name='username' placeholder='type your name' defaultValue={this.state.user.username} onChange={this.handleChange} required />
//             <br/>
//           </label>
//           <label> Your role is:
//             <input type='text' name='capabilities' placeholder='type your name' defaultValue={this.state.user.capabilities} onChange={this.handleChange} required />
//             <br/>
//           </label>
//           <label> Your Email is:
//             <input type='text' name='userEamil' placeholder='type your name' defaultValue={this.state.user.userEamil} onChange={this.handleChange} required />
//             <br/>
//           </label>
//           <button >Submit</button>
//         </form>
//       </div>
//     </Model>
//   </When>
// </div>






// <div>
// <GaugeChart id="gauge-chart2" 
//   nrOfLevels={20} 
//   percent={0.86}
//   needleColor	={"blue"}
// />

// <GaugeChart id="gauge-chart3" 
//   nrOfLevels={30} 
//   colors={['#FF5F6D', '#FFC371']} 
//   arcWidth={0.3} 
//   percent={0.37} 
// />

// {/* <ReactSpeedometer />

// <Gauge value={this.state.value} width={400} height={320} label="This is my Gauge" /> */}
// </div>



















































//  <div className='header-containar'>
//   <img src={logo}  className="wow fadeInLeft slower logo" height="65px" width="200px"/>
//   <link rel="stylesheet" href="animate.min.css"></link>
//   <div className="wow pulse slower" data-wow-offset='50' data-wow-delay="0s" data-wow-iteration="500">
//       <h1>Food Ashur's</h1>
//     </div> 
//   <div  className="open" onClick={this.handleClick}>
//     <span className="cls"></span>
//     <span>
//       <ul className="sub-menu ">
//         <li>
//           <Link to='/Food-Ashur-s/Food-Ashurs-Full-App'>Home</Link>
//         </li>
//         <li>
//           <NavLink to='/profile'>profile</NavLink>
//         </li>
  
//         <li>
//           <a href="#resipient" title="resipient">Order</a>
//         </li>
//         <li>
//           <a href="#aboutUs" title="aboutUs">About Us</a>
//         </li>
//         <li>
//           <If condition={this.context.loggedIn}>
//             <a onClick={this.context.logout} >Log Out!</a>
//           </If>
//           <If condition={!this.context.loggedIn}>
//             <a onClick={this.handleSignClick}>Log In</a>
//             {/* <button onClick={this.handleSignClick} className="signForm-button" >
//       SignIn</button> */}
//           </If>
//           {/* <a href="#setting" title="setting">Log Out</a> */}
//         </li>
//       </ul>
//     </span>
//     <span className="cls"></span>
//   </div>
// </div> 
































