/* eslint-disable no-unused-vars */
import React from 'react';
import { LoginContext } from './context.js';
// import { JsonWebTokenError } from 'jsonwebtoken';
import { GoogleLoginButton} from 'react-social-login-buttons';

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

  render() {
    return (
      <>
        {/* <If condition={this.context.loggedIn}>
          <button onClick={this.context.logout}>Log Out!</button>
        </If> */}

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
              <label for="check"><span class="icon"></span> Keep me Signed in</label>
            </div>
            <div className="group">
              <button  className="button" >Log In!</button>
              {/* <input type="submit" className="button" value="Sign In"/> */}
            </div>
            <div className="group-google">
              <GoogleLoginButton className="button-google"/>
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