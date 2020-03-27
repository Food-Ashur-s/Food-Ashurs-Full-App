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

import GoogleLog from './component/auth/login-google.js';


export default function App (){
  // const [cart, setCart] = useState([]);


  // const handelcart = newCart => {
  //   for (let i = 0; i < cart.length; i++) {
  //     if( newCart._id === cart[i]._id) return;
  //   }
  //   setCart([...cart, newCart]);
  // };

  return (
    <React.Fragment>
      <LoginContext>

        <Login />
        <Logup />
        <GoogleLog />
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

        <Profile />
      </LoginContext>
    </React.Fragment>
  );
}