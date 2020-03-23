/* eslint-disable no-unused-vars */
import React from 'react';
import Recipients from './component/resipient/resipient.js';
import Donor from './component/donor/donor.js';
import Header from './component/header/header.js';
import Footer from './component/footer/footer.js';
import SettingsProvider from './component/auth/context.js';
import LoginContext from './component/auth/context.js';
// import Login from './component/auth/login.js';
import Auth from './component/auth/auth.js';
// import Logup from './component/auth/logup.js';
import SignForm from './component/sign-forms/signForm.js';

const If = props => {
  return props.condition ? props.children : null;
};

const Donors = props => {
  return (
    <Auth capability='donor'>
      <SettingsProvider>
        <Donor />
      </SettingsProvider>
    </Auth>
  );
};
const Recipient = props => {
  return (
    <Auth capability='recipient'>
      <SettingsProvider>
        <Recipients />
      </SettingsProvider>
    </Auth>
  );
};

export default function App (){
  return (
    <>
      <LoginContext>
        <Header/>


        <SignForm/>

        <Donors />
        <Recipient />
      </LoginContext>
      <Footer/>
    </>
  );
}
