/* eslint-disable no-unused-vars */
import React ,{useState} from 'react';
import {Route} from 'react-router-dom';

import Recipients from './component/resipient/resipient.js';
import Donor from './component/donor/donor.js';
import Header from './component/header/header.js';
import Footer from './component/footer/footer.js';
import Profile from './component/profile.js';
import SettingsProvider from './component/auth/context.js';
import LoginContext from './component/auth/context.js';
// import Login from './component/auth/login.js';
import Auth from './component/auth/auth.js';
// import Logup from './component/auth/logup.js';
// import SignForm from '../src/component/sign-forms/signForm.js';
import SlideTwo from '../src/component/slideshowTwo/slideshowTwo.js';
// import Header from './component/header/header.js';
import GoogleLog from './component/auth/login-google.js';
import About from '../src/component/aboutus/about.js';
import SlideShow from '../src/component/slideShow/slideShow.js';


export default function App (){

  return (
    <>
      <LoginContext>
        <Route exact path= '/Food-Ashur-s/Food-Ashurs-Full-App'>
          <Header />
          {/* <GoogleLog /> */}
          <SlideTwo/>
          {/* <SignForm/> */}

          <Auth capability='recipient'>
            <SettingsProvider>
              <Recipients />
            </SettingsProvider>
          </Auth>
          <Auth capability='donor'>
            <SettingsProvider>
              <Donor />
            </SettingsProvider>
          </Auth>
          <SlideShow/>
          <About />
          <Footer/>
        </Route>
        <Route exact path= '/profile'>
          {/* <Header /> */}
          <Profile />
          <Footer/>
        </Route>

      </LoginContext>
    </>
  );
}