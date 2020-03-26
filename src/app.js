/* eslint-disable no-unused-vars */
import React , {useState} from 'react';
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
import SignForm from './component/sign-forms/signForm.js';
import SlideShow from './component/slideShow/slideShow.js';

const If = props => {
  return props.condition ? props.children : null;
};

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
    <>
      <LoginContext>
        <Header/>
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
        <SlideShow/>
        <Footer/>
      </LoginContext>
    </>
  );
}
