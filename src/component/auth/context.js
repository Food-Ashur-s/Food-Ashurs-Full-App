/* eslint-disable no-undefined */
import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

const API = process.env.REACT_APP_API;
const SECRET = process.env.SECRET;
console.log(API,  SECRET);

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      login: this.login,
      logout: this.logout,
      logup: this.logup,
      user: {},
    };
  }

  login = (username, password) =>{
    fetch(`${API}/signin`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      }),
    })
      .then(response => response.text())
      .then(token => this.validateToken(token))
      .catch(console.error);
  }

  logup = (username, password, email, role) =>{
    let newbody = {username, password, email, role};
    return fetch(`${API}/signup`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: newbody ? JSON.stringify(newbody) : undefined,
    })
      .then( response => {
        // console.log(response);
        this.genarateToken(newbody);
        response.json();
      })
      .catch(console.error);
  }

  genarateToken = user => {

    let userData = {
      username: user.username,
      userEamil: user.email,
      capabilities: user.role,
    };
    let token = jwt.sign(userData, 'ashurFood');
    this.setLoginState(true, token, user);
  }

  validateToken = token =>{
    try {
      let user = jwt.verify(token, 'ashurFood');
      this.setLoginState(true, token, user);
    } catch {
      this.setLoginState(false, null, {});
      // alert('wrong password/username');
      console.error('token invalid');
    }
  }
  setLoginState = (loggedIn, token, user) =>{
    cookie.save('auth', token);
    this.setState({token, loggedIn, user});
    // this.props.setUser(this.state.user);
  }

    logout = () =>{
      this.setLoginState(false, null, {});
    }

    componentDidMount(){
      const qs = new URLSearchParams(window.location.search);
      const cookieToken = cookie.load('auth');
      const token = qs.get('token') || cookieToken || null;
      this.validateToken(token);
    }

    render(){
      return (
        <LoginContext.Provider value={this.state}>
          {this.props.children}
        </LoginContext.Provider>
      );
    }
}

export default LoginProvider;