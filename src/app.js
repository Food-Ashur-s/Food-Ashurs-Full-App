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
          <SettingsProvider setUser={handelUser}>
            <Recipients cartList={cart} handelcart={handelcart}/>
          </SettingsProvider>
        </Auth>
        <Auth capability='donor'>
          <SettingsProvider setUser={handelUser}>
            <Donor cartList={cart} handelcart={handelcart}/>
          </SettingsProvider>
        </Auth>
        {/* <Route exact path= '/profile'> */}
        <Profile cartList={cart} handelcart={handelcart} setCartList={setCart} userInfo={user}/>
        {/* </Route> */}
      </LoginContext>
    </React.Fragment>
  );
}