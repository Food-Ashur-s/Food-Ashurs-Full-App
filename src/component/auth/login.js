/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React from 'react';
import { LoginContext } from './context.js';
// import { JsonWebTokenError } from 'jsonwebtoken';
import { GoogleLoginButton} from 'react-social-login-buttons';

// import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import GoogleLogin from 'react-google-login';
// import { GoogleLogout } from 'react-google-login';
// import { LoginContext } from '../auth/context.js';

const If = props => {
  return props.condition ? props.children : null;
};


class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userDetails: {},
      isUserLoggedIn: false,
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name] : e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password);
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

 };

 render() {
   return (
     <>
       <If condition={!this.context.loggedIn}>
         <form onSubmit={this.handleSubmit} className="sign-in-htm">
           <div className="group">
             <label for="user" className="label">Username</label>
             <input name="username" type="user" className="input" placeholder="Enter your name" onChange={this.handleChange}/>
           </div>
           <div className="group">
             <label for="pass" class="label">Password</label>
             <input name="password" type="password" className="input" data-type="password" placeholder="Enter your password" onChange={this.handleChange}/>
           </div>
           <div className="group">
             <input name="check" type="checkbox" className="check" checked />
             <label for="check"><span className="icon"></span> Keep me Signed in</label>
           </div>
           <div className="group">
             <button  className="button" >Log In!</button>
             {/* <input type="submit" className="button" value="Sign In"/> */}
           </div>
           <div className="group-google">
             {!this.context.loggedIn && (
               <GoogleLogin
                 clientId="729663215177-d2uq3c446ce2gfkoopbuhm4debo4crvf.apps.googleusercontent.com"
                 render={renderProps => (
                   <button
                     className="button-google"
                     onClick={renderProps.onClick}
                     disabled={renderProps.disabled}
                   >
                        Log in with Google As Recipent
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
                     className="button-google"
                     onClick={renderProps.onClick}
                     disabled={renderProps.disabled}
                   >
                        Log in with Google As Donor
                   </button>
                 )}
                 onSuccess={this.responseGoogle2}
                 onFailure={this.responseGoogle2}
               />
             )}
           </div>
           <div className="hr"></div>
           <div className="foot-lnk">
             <a href="#forgot">Forgot Password?</a>
           </div>
         </form>
       </If>
     </>
   );
 }
}

export default Login;
