/* eslint-disable camelcase */
import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { LoginContext } from './context.js';

export const GoogleLogContext = React.createContext();

class GoogleLogProvider extends React.Component {
    static contextType = LoginContext;

    constructor() {
      super();
      this.state = {
        userDetails: {},
        isUserLoggedIn: false,
      };
    }

   responseGoogle1 = (response) => {
     this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
     //  console.log( response.googleId);

     let id_token = response.getAuthResponse().id_token;
     let user = {
       name: response.profileObj.name,
       email: response.profileObj.email,
       role: 'recipient',
     };
     this.genarateToken(user);
   };

   responseGoogle2 = (response) => {
     this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
     let id_token = response.getAuthResponse().id_token;
     let user = {
       name: response.profileObj.name,
       email: response.profileObj.email,
       role: 'recipient',
     };
     //  console.log(user);
     this.genarateToken(user);
   };

   genarateToken = user => {
     let userData = {
       username: user.username,
       userEamil: user.email,
       capabilities: user.role,
     };
     let token = jwt.sign(userData, 'ashurFood');
     this.setLoginState(true, token, user);
   }

  setLoginState = (isUserLoggedIn, token, user) =>{
    cookie.save('auth', token);
    this.setState({token, isUserLoggedIn, user});
  }
  componentDidMount(){
    console.log(this.state.userDetails);
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    this.setLoginState(true, token, this.state.user);
  }

   logout = () => {
     this.setLoginState(false, null, {});
     console.log(this.state);

   };

   render() {
     return (
       <div className="App">
         {console.log(this.state.isUserLoggedIn)}
         {!this.state.isUserLoggedIn && (
           <GoogleLogin
             clientId="729663215177-d2uq3c446ce2gfkoopbuhm4debo4crvf.apps.googleusercontent.com"
             render={renderProps => (
               <button
                 className="button"
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
         {!this.state.isUserLoggedIn && (
           <GoogleLogin
             clientId="729663215177-d2uq3c446ce2gfkoopbuhm4debo4crvf.apps.googleusercontent.com"
             render={renderProps => (
               <button
                 className="button"
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
         {this.state.isUserLoggedIn && (
           <div className="userDetails-wrapper">
             <div className="details-wrapper">
               <GoogleLogout
                 render={renderProps => (
                   <button
                     className="logout-button"
                     onClick={renderProps.onClick}
                   >
                            Log Out
                   </button>
                 )}
                 onLogoutSuccess={this.logout}
               />

               <div className="image">
                 <img src={this.state.userDetails.imageUrl} />
               </div>
               <div className="name">
                      Welcome Mr. {this.state.userDetails.givenName}{' '}
                 {this.state.userDetails.familyName}
               </div>
               <div className="email"><i>{this.state.userDetails.email}</i></div>
             </div>
             <div className="bar" />
             <div className="stand" />
           </div>
         )}
       </div>
     );
   }

}

export default GoogleLogProvider;