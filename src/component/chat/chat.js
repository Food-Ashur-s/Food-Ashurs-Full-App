// Chat channel by using hooks and socket-client
import React, { useState , useEffect} from 'react'; // we use UsState hook to render the componenet once we update app state
import useSocket from 'use-socket.io-client';
import { useImmer } from 'use-immer';
// import 'react-chat-widget/lib/styles.css';
import Reactemoji from 'react-emoji';
import ScrollToBottom from 'react-scroll-to-bottom';

import './chat.scss';

import logo from '../../chatAssests/logo.png';
import onlineIcon from '../../chatAssests/onlineIcon.png';

// import { Chat } from 'react-chat-popup';

// Component to render users messagess (from google)
const Messages = props => props.data.map(msg => msg[0] !== '' ? (<span><li className="userName"><div className="innermsg">{msg[0]} : {Reactemoji.emojify(msg[1])}</div></li></span>) : (<li className="update">{Reactemoji.emojify(msg[1])}</li>) );

// Component to check the users status (from google)
const Online = props => props.data.map(onlineStatus =>
<div id={onlineStatus[0]}>
   <img src={onlineIcon}/>
    {` ${onlineStatus[1]}`}
   </div> );

function ChatChannel (props) {
    const [id, setId] = useState(''); // set the ID for the user 
    const [nameInput, setNameInput] = useState(''); // User's name 
    const [room, setRoom] = useState(''); // chat Rooms
    const [input, setInput] = useState(''); // chat messages (inner)
    const [showChat, setChatForm] = useState(false);

  
    // bulid-in socket
    const [socket] = useSocket('https://open-chat-naostsaecf.now.sh');
    // connect to internal server 
    socket.connect();
  
    // update our messages to avoid duplicated with the old state and updated state as Tuple
    const [messages, setMessages] = useImmer([]);
    const [online, setOnline] = useImmer([]);
  
    // component life cycle - build-in events
    useEffect(()=>{
      socket.on('message queue',(nick,message) => {
        setMessages(draft => {
          draft.push([nick,message])
        })
      });
      
      // when typing message again and again 
      socket.on('update',message => setMessages(draft => {
        draft.push(['',message]);
      }))
  
      // all people list 
      socket.on('people-list',people => {
        let newState = [];
        for(let person in people){
          newState.push([people[person].id,people[person].nick]);
        }
        setOnline(draft=>{draft.push(...newState)});
        console.log(online)
      });
  
      // someone joined to the chat 
      socket.on('add-person',(nick,id)=>{
        setOnline(draft => {
          draft.push([id,nick])
        })
      })
  
      // someone go out from chat 
      socket.on('remove-person',id=>{
        setOnline(draft => draft.filter(m => m[0] !== id))
      })
  
      // show up the message with the user name 
      socket.on('chat message',(nick,message)=>{
        setMessages(draft => {draft.push([nick,message])})
      })
    },0);
  
    // Handle login to our chat
    const handleSubmit = event => {
      event.preventDefault();
      if (!nameInput) {
        return alert("Name can't be empty , Enter a Name");
      }
      setId(nameInput);
      socket.emit("join", nameInput,room);
    };
  
    // message send 
    const handleSend = event => {
      event.preventDefault();
      event.target.reset();
      if(input !== ''){
        socket.emit('chat message',input,room);
        setInput('');
      }
    }

    // message input 
    const handleChangeMsg = event => {
        event.preventDefault();
        setInput(event.target.value.trim());
    }
  
    // people names 
    const handleChangeName = event => {
        setNameInput(event.target.value.trim())
    }
    
    // chat rooms 
    const handleChangeRoom = event => {
        setRoom(event.target.value.trim())
    }


    // const toggleChatForm = () => setChatForm(!showChat);

    // if statement to login to chat or typing message 
    return id ? (
      <div className="chat-pop">
      <section className="innerForm" >
      <button className="close" onClick={() => window.close()}>X</button>
      <button className="goHome" onClick={() => window.open("http://localhost:3000/Food-Ashur-s/Food-Ashurs-Full-App")}> Home</button>
           <div className="words">
      <h1>Food-Ashur's Chat-App <span role="img" aria-label="emoji">💬</span></h1>
           {/* <img className="logo" src={logo} /> */}
      <h2>Help Us To Help Them  <span role="img" aria-label="emoji">❤️</span></h2>
    </div>
        <div className="msgOn">
          <ScrollToBottom>
          <ul className="messages"><Messages data={messages} /></ul>
          </ScrollToBottom>
        </div>
        <ul className="online">  Online People : <Online data={online} /> </ul>
        <div className="sendform"> 
          <form onSubmit={event => handleSend(event)} className="msgSub">
              <input className="msgInput" id="m" onChange={event=> handleChangeMsg(event) } placeholder="Type a Message ... Press Enter "/>
              <button className="msgSend" type="submit">Message</button>
          </form>
        </div>
      </section>
      </div>
    ) 
    : (
    <div className="chat-pop">
      <div className="outerForm">
        <form onSubmit={event => handleSubmit(event)}>
          <img src={logo} className="logoImg"/>
        <div className="foodName"> Food Ashur's Chat </div>
          <input className="name" onChange={event => handleChangeName(event)} required placeholder="Enter your name"/><br />
          <input className="room" onChange={event => handleChangeRoom(event)} required placeholder="Enter your room" /><br />
          <button className="submitB" type="submit">Submit</button>
           <svg /*onClick={toggleChatForm}*/className="chat" viewBox="0 -26 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m256 100c-5.519531 0-10 4.480469-10 10s4.480469 10 10 10 10-4.480469 10-10-4.480469-10-10-10zm0 0"/><path d="m90 280c5.519531 0 10-4.480469 10-10s-4.480469-10-10-10-10 4.480469-10 10 4.480469 10 10 10zm0 0"/><path d="m336 0c-90.027344 0-163.917969 62.070312-169.632812 140.253906-85.738282 4.300782-166.367188 66.125-166.367188 149.746094 0 34.945312 13.828125 68.804688 39 95.632812 4.980469 20.53125-1.066406 42.292969-16.070312 57.296876-2.859376 2.859374-3.714844 7.160156-2.167969 10.898437 1.546875 3.734375 5.191406 6.171875 9.238281 6.171875 28.519531 0 56.003906-11.183594 76.425781-30.890625 19.894531 6.78125 45.851563 10.890625 69.574219 10.890625 90.015625 0 163.898438-62.054688 169.628906-140.222656 20.9375-.929688 42.714844-4.796875 59.945313-10.667969 20.421875 19.707031 47.90625 30.890625 76.425781 30.890625 4.046875 0 7.691406-2.4375 9.238281-6.171875 1.546875-3.738281.691407-8.039063-2.167969-10.898437-15.003906-15.003907-21.050781-36.765626-16.070312-57.296876 25.171875-26.828124 39-60.6875 39-95.632812 0-86.886719-86.839844-150-176-150zm-160 420c-23.601562 0-50.496094-4.632812-68.511719-11.800781-3.859375-1.539063-8.269531-.527344-11.078125 2.539062-12.074218 13.199219-27.773437 22.402344-44.878906 26.632813 9.425781-18.058594 11.832031-39.347656 6.097656-59.519532-.453125-1.589843-1.292968-3.042968-2.445312-4.226562-22.6875-23.367188-35.183594-53.066406-35.183594-83.625 0-70.46875 71.4375-130 156-130 79.851562 0 150 55.527344 150 130 0 71.683594-67.289062 130-150 130zm280.816406-186.375c-1.152344 1.1875-1.992187 2.640625-2.445312 4.226562-5.734375 20.171876-3.328125 41.460938 6.097656 59.519532-17.105469-4.226563-32.804688-13.433594-44.878906-26.632813-2.808594-3.0625-7.21875-4.078125-11.078125-2.539062-15.613281 6.210937-37.886719 10.511719-58.914063 11.550781-2.921875-37.816406-21.785156-73.359375-54.035156-99.75h130.4375c5.523438 0 10-4.476562 10-10s-4.476562-10-10-10h-161.160156c-22.699219-11.554688-48.1875-18.292969-74.421875-19.707031 5.746093-67.164063 70.640625-120.292969 149.582031-120.292969 84.5625 0 156 59.53125 156 130 0 30.558594-12.496094 60.257812-35.183594 83.625zm0 0"/><path d="m256 260h-126c-5.523438 0-10 4.476562-10 10s4.476562 10 10 10h126c5.523438 0 10-4.476562 10-10s-4.476562-10-10-10zm0 0"/><path d="m256 320h-166c-5.523438 0-10 4.476562-10 10s4.476562 10 10 10h166c5.523438 0 10-4.476562 10-10s-4.476562-10-10-10zm0 0"/><path d="m422 100h-126c-5.523438 0-10 4.476562-10 10s4.476562 10 10 10h126c5.523438 0 10-4.476562 10-10s-4.476562-10-10-10zm0 0"/></svg>
        </form>
         <svg /*onClick={toggleChatForm}*/className="chat" viewBox="0 -26 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m256 100c-5.519531 0-10 4.480469-10 10s4.480469 10 10 10 10-4.480469 10-10-4.480469-10-10-10zm0 0"/><path d="m90 280c5.519531 0 10-4.480469 10-10s-4.480469-10-10-10-10 4.480469-10 10 4.480469 10 10 10zm0 0"/><path d="m336 0c-90.027344 0-163.917969 62.070312-169.632812 140.253906-85.738282 4.300782-166.367188 66.125-166.367188 149.746094 0 34.945312 13.828125 68.804688 39 95.632812 4.980469 20.53125-1.066406 42.292969-16.070312 57.296876-2.859376 2.859374-3.714844 7.160156-2.167969 10.898437 1.546875 3.734375 5.191406 6.171875 9.238281 6.171875 28.519531 0 56.003906-11.183594 76.425781-30.890625 19.894531 6.78125 45.851563 10.890625 69.574219 10.890625 90.015625 0 163.898438-62.054688 169.628906-140.222656 20.9375-.929688 42.714844-4.796875 59.945313-10.667969 20.421875 19.707031 47.90625 30.890625 76.425781 30.890625 4.046875 0 7.691406-2.4375 9.238281-6.171875 1.546875-3.738281.691407-8.039063-2.167969-10.898437-15.003906-15.003907-21.050781-36.765626-16.070312-57.296876 25.171875-26.828124 39-60.6875 39-95.632812 0-86.886719-86.839844-150-176-150zm-160 420c-23.601562 0-50.496094-4.632812-68.511719-11.800781-3.859375-1.539063-8.269531-.527344-11.078125 2.539062-12.074218 13.199219-27.773437 22.402344-44.878906 26.632813 9.425781-18.058594 11.832031-39.347656 6.097656-59.519532-.453125-1.589843-1.292968-3.042968-2.445312-4.226562-22.6875-23.367188-35.183594-53.066406-35.183594-83.625 0-70.46875 71.4375-130 156-130 79.851562 0 150 55.527344 150 130 0 71.683594-67.289062 130-150 130zm280.816406-186.375c-1.152344 1.1875-1.992187 2.640625-2.445312 4.226562-5.734375 20.171876-3.328125 41.460938 6.097656 59.519532-17.105469-4.226563-32.804688-13.433594-44.878906-26.632813-2.808594-3.0625-7.21875-4.078125-11.078125-2.539062-15.613281 6.210937-37.886719 10.511719-58.914063 11.550781-2.921875-37.816406-21.785156-73.359375-54.035156-99.75h130.4375c5.523438 0 10-4.476562 10-10s-4.476562-10-10-10h-161.160156c-22.699219-11.554688-48.1875-18.292969-74.421875-19.707031 5.746093-67.164063 70.640625-120.292969 149.582031-120.292969 84.5625 0 156 59.53125 156 130 0 30.558594-12.496094 60.257812-35.183594 83.625zm0 0"/><path d="m256 260h-126c-5.523438 0-10 4.476562-10 10s4.476562 10 10 10h126c5.523438 0 10-4.476562 10-10s-4.476562-10-10-10zm0 0"/><path d="m256 320h-166c-5.523438 0-10 4.476562-10 10s4.476562 10 10 10h166c5.523438 0 10-4.476562 10-10s-4.476562-10-10-10zm0 0"/><path d="m422 100h-126c-5.523438 0-10 4.476562-10 10s4.476562 10 10 10h126c5.523438 0 10-4.476562 10-10s-4.476562-10-10-10zm0 0"/></svg>
      </div>
</div>
    );
  }; // end of ChatChannel Component

  export default ChatChannel;