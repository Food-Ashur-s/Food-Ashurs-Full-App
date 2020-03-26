/* eslint-disable camelcase */
import React from 'react';
import { LoginContext } from './context.js';
// import { JsonWebTokenError } from 'jsonwebtoken';

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

  // loginByGoogle = e =>{
  //   let URL = 'https://accounts.google.com/o/oauth2/v2/auth';

  //   let options = {
  //     // response_type:code,
  //     client_id: '54228323733-dv9m3667fkrc94vlr2aa4b9lel1ogbq5.apps.googleusercontent.com',
  //     redirect_uri: 'https://food--ashurs.herokuapp.com/oauth',
  //     scope: 'openid profile email',
  //     response_type: 'code',
  //     // access_type:online,
  //     state: '401appconsent',
  //   };

  //   let QueryString = Object.keys(options).map((key) => {
  //     return `${key}=` + encodeURIComponent(options[key]);
  //   }).join('&');


  //   let authURL = `${URL}?${QueryString}`;
  //   console.log('authURL',authURL);
  //   console.log(e.target);
  //   let link = document.getElementById('oauth');
  //   link.setAttribute('href', authURL);
  //   // fetch(`${API}/signin`, {
  //   //   method: 'post',
  //   //   mode: 'cors',
  //   //   cache: 'no-cache',
  //   //   headers: new Headers({
  //   //     'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
  //   //   }),
  //   // })
  //   //   .then(response =>  response.text())
  //   //   .then(token => this.validateToken(token))
  //     // .catch(console.error);
  //   console.log('link' , link);
  //   console.log(document.getElementsByTagName('body'));
    
  //   this.context.loginGoogle(this.state.username, this.state.password, link);
  // }
  render() {
    return (
      <>
        <If condition={this.context.loggedIn}>
          <button onClick={this.context.logout}>Log Out!</button>
        </If>

        <If condition={!this.context.loggedIn}>
          <form onSubmit={this.handleSubmit}>
            <input name="username" onChange={this.handleChange} placeholder='Enter your UserName' required/>
            <input type='password' name="password" onChange={this.handleChange}  placeholder='Enter your Password' required/>
            <button>Log In!</button>
          </form>
          {/* <button onClick={this.loginByGoogle}><a href='#' id='oauth'>Login by Google</a></button> */}
        </If>
      </>
    );
  }
}

export default Login;