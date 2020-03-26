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
import GoogleLogContext from './component/auth/login-google.js';
import GoogleLogProvider from './component/auth/login-google.js';
import GoogleLog from './component/auth/login-google.js';
import GoogleAuth from './component/auth/google-auth.js';


export default function App (){
  const [cart, setCart] = useState([]);
  const [user, setUserData] = useState({});

  const handelUser = user =>    setUserData(user);

  const handelcart = newCart => {
    for (let i = 0; i < cart.length; i++) {
      if( newCart._id === cart[i]._id) return;
    }
    setCart([...cart, newCart]);
  };

  return (
    <React.Fragment>
      <LoginContext>
        <Login />
        <Logup />
        <Auth capability='recipient'>
          <SettingsProvider>
            <Recipients cartList={cart} handelcart={handelcart}/>
          </SettingsProvider>
        </Auth>
        <Auth capability='donor'>
          <SettingsProvider>
            <Donor cartList={cart} handelcart={handelcart}/>
          </SettingsProvider>
        </Auth>

        <GoogleLogContext>
          {/* <GoogleLog /> */}
          <GoogleAuth capability='recipient'>
            <GoogleLogProvider>
              <Recipients cartList={cart} handelcart={handelcart}/>
            </GoogleLogProvider>
          </GoogleAuth>
          <GoogleAuth capability='donor'>
            <GoogleLogProvider>
              <Donor cartList={cart} handelcart={handelcart}/>
            </GoogleLogProvider>
          </GoogleAuth>
          <Profile cartList={cart} handelcart={handelcart} setCartList={setCart} userInfo={user}/>
        </GoogleLogContext>
      </LoginContext>
    </React.Fragment>
  );
}