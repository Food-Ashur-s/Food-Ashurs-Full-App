import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
 
class Login extends React.Component{
 
  constructor (props, context) {
    super(props, context);
  }
 
  responseGoogle (googleUser) {
    console.log('googleUser : ', googleUser);
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();
    
    console.log({ googleId });
    console.log({accessToken: id_token});
    // localStorage.setItem("userID", JSON.stringify(googleId));
    // window.location.reload();
    }
 
  render () {
    return (
      <div>
        <input type="text" placeholder="username"/>
              <input type="text" placeholder="password"/> 
              <button>SignIn</button>
        <GoogleLogin socialId="729663215177-d2uq3c446ce2gfkoopbuhm4debo4crvf.apps.googleusercontent.com"
                     className="google-login"
                     scope="profile"
                     fetchBasicProfile={false}
                     responseHandler={this.responseGoogle}
                     buttonText="Login With Google"/>
      </div>
    );
  }
 
}
 
export default Login;