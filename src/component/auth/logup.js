import React from 'react';
import { LoginContext } from './context.js';
import { JsonWebTokenError } from 'jsonwebtoken';

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
        {/* <If condition={this.context.loggedIn}>
          <button onClick={this.context.logout}>Log Out!</button>
        </If> */}

        <If condition={!this.context.loggedIn}>
          <form onSubmit={this.handleSubmit}>

            <input name="username" onChange={this.handleChange} placeholder='Enter your UserName' required/>
            <input type='password' name="password" onChange={this.handleChange}  placeholder='Enter your Password' required/>
            <input name="email" onChange={this.handleChange} placeholder='Enter your Email' required/>
            <label> Donor
              <input type='radio' name="role" value='donor' onClick={this.handleChange} required/>
            </label>
            <label> Recipient
              <input type='radio' name="role" value='recipient' onClick={this.handleChange}  required/>
            </label>
            <button>Sign up!</button>
          </form>
        </If>
      </>
    );
  }
}

export default Logup;