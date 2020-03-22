import React , { Component } from 'react';
import GoogleLogin from 'react-google-login'

export default class Login extends Component {

    responseGoogle = async (response) => {
       const userObject = {
          username: response.w3.ofa,
          password: 'test'
       }
       if(response.w3.ofa) {
          await localStorage.setItem("user", JSON.stringify(userObject));
          await window.location.reload();
       } else {

    }
    console.log(response);
    }
    
    render(){
       return(
           <div>
              <input type="text" placeholder="username"/>
              <input type="text" placeholder="password"/> 
              <button>SignIn</button>
              <GoogleLogin
                clientId="729663215177-d2uq3c446ce2gfkoopbuhm4debo4crvf.apps.googleusercontent.com
                " 
                buttonText="Log in with Google"
                onSuccess={this.props.responseGoogle}
                onFailure={this.props.responseGoogleError}
              />
           </div>
       )
    }
}