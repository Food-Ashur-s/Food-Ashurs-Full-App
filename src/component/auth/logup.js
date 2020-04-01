/* eslint-disable no-unused-vars */
import React from 'react';
import { LoginContext } from './context.js';
// import { JsonWebTokenError } from 'jsonwebtoken';
import { GoogleLoginButton} from 'react-social-login-buttons';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import GoogleLogin from 'react-google-login';

const If = props => {
  return props.condition ? props.children : null;
};

class Logup extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      role: '',
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name] : e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.context.logup(this.state.username, this.state.password, this.state.email, this.state.role);
    e.target.reset();
  }
  responseGoogle1 = (response) => {
    this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
    //  let id_token = response.getAuthResponse().id_token;
    this.context.logup(response.profileObj.givenName, response.profileObj.googleId,  response.profileObj.email, 'recipient');
  };

 responseGoogle2 = (response) => {
   this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
   //  let id_token = response.getAuthResponse().id_token;
   this.context.logup(response.profileObj.givenName, response.profileObj.googleId,  response.profileObj.email, 'donor');
 }
 render() {
   return (
     <>
       <If condition={!this.context.loggedIn}>
         <form onSubmit={this.handleSubmit} className="sign-up-htm">
           <div className="group">
             <label for="user" className="label">Username</label>
             <input name="username" type="text" className="input" placeholder="enter your name" onChange={this.handleChange}/>
           </div>
           <div className="group">
             <label for="pass" className="label">Password</label>
             <input name="password" type="password" className="input" data-type="password" placeholder="Enter your password" onChange={this.handleChange}/>
           </div>
           <div className="group">
             <label for="pass" className="label">Email Address</label>
             <input name="email" type="email" className="input" placeholder="username@gmail.com" onChange={this.handleChange}/>
           </div>
           <div className="radio">
             <label>
               <input type='radio' name="role" value='donor' onClick={this.handleChange} required/>DONOR
             </label>
             <label>
               <input type='radio' name="role" value='recipient' onClick={this.handleChange}  required/> RECIPIENT
             </label>
           </div>
           <div className="group" >
             <input type="submit" className="button" value="Sign Up"/>
           </div>
           <div className="group-google">
             {!this.context.loggedIn && (
               <GoogleLogin
                 clientId="729663215177-d2uq3c446ce2gfkoopbuhm4debo4crvf.apps.googleusercontent.com"
                 render={renderProps => (
                   <button
                     className="fa fa-google button-google"
                     onClick={renderProps.onClick}
                     disabled={renderProps.disabled}
                   >
                        SIGN UP AS A RECIPIENT
                   </button>
                 )}
                 onSuccess={this.responseGoogle1}
                 onFailure={this.responseGoogle1}
               />
             )}
             {!this.context.loggedIn && (
               <GoogleLogin
                 clientId="729663215177-d2uq3c446ce2gfkoopbuhm4debo4crvf.apps.googleusercontent.com"
                 render={renderProps => (
                   <button
                     className="fa fa-google button-google"
                     onClick={renderProps.onClick}
                     disabled={renderProps.disabled}
                   >
                        SIGN UP AS A DONOR
                   </button>
                 )}
                 onSuccess={this.responseGoogle2}
                 onFailure={this.responseGoogle2}
               />
             )}
           </div>
         </form>
       </If>
     </>
   );
 }
}

export default Logup;