import React from 'react';
import Recipients from './component/resipient/resipient.js';
import Donor from './component/donor/donor.js';

import SettingsProvider from './component/auth/context.js';
import LoginContext from './component/auth/context.js';
import Login from './component/auth/login.js';
import Auth from './component/auth/auth.js';
import Logup from './component/auth/logup.js';

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
        <Login />
        <Logup />
        <Donors />
        <Recipient />
      </LoginContext>
    </>
  );
}