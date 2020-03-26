/* eslint-disable camelcase */
import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { LoginContext } from './context.js';


class GoogleLog extends React.Component {
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

      //  let id_token = response.getAuthResponse().id_token;

      // console.log(response.profileObj.givenName, response.profileObj.googleId,  response.profileObj.email, 'recipient');

      this.context.logup(response.profileObj.givenName, response.profileObj.googleId,  response.profileObj.email, 'recipient');
    };

   responseGoogle2 = (response) => {
     this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
     //  let id_token = response.getAuthResponse().id_token;

     //  console.log(response.profileObj.givenName, response.profileObj.googleId,  response.profileObj.email, 'donor');
     this.context.logup(response.profileObj.givenName, response.profileObj.googleId,  response.profileObj.email, 'donor');

   };


   //  logout = () => {
   //     // this.setState({ isUserLoggedIn: false });
   //  };

   render() {
     return (
       <div className="App">
         {!this.context.loggedIn && (
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
         {!this.context.loggedIn && (
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
         {/* {this.state.isUserLoggedIn && (
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
         )}*/}
       </div>
     );
   }

}

export default GoogleLog;