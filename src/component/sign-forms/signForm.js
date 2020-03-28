/* eslint-disable no-unused-vars */
import React from 'react';
import './signForm.scss';
import SignInForm from '../auth/login.js';
import SignUpForm from '../auth/logup.js';
import {LoginContext} from '../auth/context.js';

const If = props => {
  return props.condition ? props.children : null;
};
class Form extends React.Component{
static contextType = LoginContext;
render(){
  return (
    <React.Fragment>
      <If condition={this.context.loggedIn}>
        <button onClick={this.context.logout} >Log Out!</button>
      </If>

      <If condition={!this.context.loggedIn}>
        <section className="sign-bg-section">
          <div className="login-wrap">
            <button onClick={this.props.close} className="sign-close">X</button>
            <div className="login-html"  action="https://github.com/Food-Ashur-s/Food-Ashurs-Full-App">
              <input id="tab-1" type="radio" name="tab" className="sign-in" checked/><label for="tab-1" class="tab">Sign In</label>
              <input id="tab-2" type="radio" name="tab" className="sign-up"/><label for="tab-2" class="tab">Sign Up</label>
              <div className="login-form">
                <SignInForm/>
                <SignUpForm/>
              </div>
            </div>
          </div>
        </section>
      </If>
    </React.Fragment>
  );

}
}

export default Form;