import React from 'react';
import Log from './component/users/users.js'
import LogGoole from './component/users/loginGoogle.js'
import GoogleLogin from 'react-google-login';

export default function App (){
  return (
    <>
      <Log />
      <LogGoole />
    </>
  );
}