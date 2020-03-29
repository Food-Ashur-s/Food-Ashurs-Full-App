/* eslint-disable no-unused-vars */
import React ,{useState} from 'react';
import {Route} from 'react-router-dom';

import Recipients from './component/resipient/resipient.js';
import Donor from './component/donor/donor.js';
import Profile from './component/profile.js';
import SettingsProvider from './component/auth/context.js';
import LoginContext from './component/auth/context.js';
import Login from './component/auth/login.js';
import Auth from './component/auth/auth.js';
import Logup from './component/auth/logup.js';
import Header from './component/header/header.js';
import GoogleLog from './component/auth/login-google.js';


export default function App (){

  return (
    <React.Fragment>
      <LoginContext>
        <Route exact path= '/Food-Ashur-s/Food-Ashurs-Full-App'>

          <Login />
          <Logup />
          <GoogleLog />

          <Auth capability='recipient'>
            <SettingsProvider>
              <Header />
              <Recipients />
            </SettingsProvider>

          </Auth>
          <Auth capability='donor'>
            <SettingsProvider>
              <Header />
              <Donor />
            </SettingsProvider>
          </Auth>

        </Route>
        <Route exact path= '/profile'>
          <Header />
          <Profile />
        </Route>

      </LoginContext>
    </React.Fragment>
  );
}