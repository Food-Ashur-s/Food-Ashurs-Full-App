/* eslint-disable no-unused-vars */
import React from 'react';
import { LoginContext } from './context.js';
// import { JsonWebTokenError } from 'jsonwebtoken';
import { GoogleLoginButton} from 'react-social-login-buttons';

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
                <input type='radio' name="role" value='donor' onClick={this.handleChange} required/>Donor
              </label>
              <label>
                <input type='radio' name="role" value='recipient' onClick={this.handleChange}  required/> Recipient
              </label>
            </div>
            <div className="group" >
              <input type="submit" className="button" value="Sign Up"/>
            </div>
            <div class="group-google">
              <GoogleLoginButton className="button-google"/>
            </div>
          </form>
        </If>
      </>
    );
  }
}

export default Logup;