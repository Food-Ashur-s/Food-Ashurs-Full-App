/* eslint-disable no-unused-vars */
import React from 'react';
import './signform.scss';
import { GoogleLoginButton} from 'react-social-login-buttons';

export default function Form (){
  return (


    <React.Fragment>
      <div class="login-wrap">
        <form class="login-html"  action="https://github.com/Food-Ashur-s/Food-Ashurs-Full-App">
          <input id="tab-1" type="radio" name="tab" class="sign-in" checked/><label for="tab-1" class="tab">Sign In</label>
          <input id="tab-2" type="radio" name="tab" class="sign-up"/><label for="tab-2" class="tab">Sign Up</label>
          <div class="login-form">
            <div class="sign-in-htm">
              <div class="group">
                <label for="user" class="label">Email</label>
                <input id="pass" type="email" class="input" placeholder="username@gmail.com"/>
              </div>
              <div class="group">
                <label for="pass" class="label">Password</label>
                <input id="pass" type="password" class="input" data-type="password" placeholder="Enter your password"/>
              </div>
              <div class="group">
                <input id="check" type="checkbox" class="check" />
                <label for="check"><span class="icon"></span> Keep me Signed in</label>
              </div>
              <div class="group">
                <input type="submit" className="button" value="Sign In"/>
              </div>
              <div class="group-google">
                <GoogleLoginButton className="button-google"/>
              </div>
              <div class="hr"></div>
              <div class="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
              </div>
            </div>
            <div class="sign-up-htm">
              <div class="group">
                <label for="user" class="label">Username</label>
                <input id="user" type="text" class="input" placeholder="enter your name"/>
              </div>
              <div class="group">
                <label for="pass" class="label">Password</label>
                <input id="pass" type="password" class="input" data-type="password" placeholder="Enter your password"/>
              </div>
              <div class="group">
                <label for="pass" class="label">Repeat Password</label>
                <input id="pass" type="password" class="input" data-type="password" placeholder="Enter your password"/>
              </div>
              <div class="group">
                <label for="pass" class="label">Email Address</label>
                <input id="pass" type="email" class="input" placeholder="username@gmail.com"/>
              </div>
              <div class="group">
                <input type="submit" className="button" value="Sign Up"/>
              </div>
              <div class="group-google">
                <GoogleLoginButton className="button-google"/>
              </div>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}