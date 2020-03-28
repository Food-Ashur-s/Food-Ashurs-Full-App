import React from 'react';
import ChatCh from './component/chat/chat.js'
import { Route ,Router } from 'react-router-dom'

export default function App (){
  return (
    <>
    {/* <Route path='/chat' component={ChatCh}> */}
     <ChatCh />
    </>
  );
}