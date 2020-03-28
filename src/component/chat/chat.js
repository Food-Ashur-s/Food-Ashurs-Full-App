// Chat channel by using hooks and socket-client
import React, { useState , useEffect} from 'react'; // we use UsState hook to render the componenet once we update app state
import useSocket from 'use-socket.io-client';
import { useImmer } from 'use-immer';
// import 'react-chat-widget/lib/styles.css';

import './chat.scss';

import logo from '../../chatAssests/logo.png';
import onlineIcon from '../../chatAssests/onlineIcon.png';

// import { Chat } from 'react-chat-popup';

// Component to render users messagess (from google)
const Messages = props => props.data.map(msg => msg[0] !== '' ? (<li className="userName">{msg[0]} : {msg[1]}</li>) : (<li className="update">{msg[1]}</li>) );

// Component to check the users status (from google)
const Online = props => props.data.map(onlineStatus =>
<div id={onlineStatus[0]}>
   <img src={onlineIcon}/>
    {` ${onlineStatus[1]}`}
   </div> );

function ChatChannel () {
    const [id, setId] = useState(''); // set the ID for the user 
    const [nameInput, setNameInput] = useState(''); // User's name 
    const [room, setRoom] = useState(''); // chat Rooms
    const [input, setInput] = useState(''); // chat messages (inner)
  
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
    // if statement to login to chat or typing message 
    return id ? (
      <section className="innerForm" >
           <div className="words">
      <h1>Food-Ashur's Chat Application <span role="img" aria-label="emoji">💬</span></h1>
           <img src={logo} />
      <h2>Help Us To Help Them  <span role="img" aria-label="emoji">❤️</span></h2>
    </div>
        <div className="msgOn">
          <ul className="messages"><Messages data={messages} /></ul>
        <ul className="online">  Online People <Online data={online} /> </ul>
        </div>
        <div className="sendform"> 
          <form onSubmit={event => handleSend(event)} className="msgSub">
              <input className="msgInput" id="m" onChange={event=> handleChangeMsg(event) } placeholder="Type a Message ... Press Enter "/>
              <button className="msgSend" type="submit">Message</button>
          </form>
        </div>
      </section>
    ) 
    : (
      <div className="outerForm">
        <form onSubmit={event => handleSubmit(event)}>
          <img src={logo} className="logoImg"/>
        <div className="foodName"> Food Ashur's Chat </div>
        {/* <Chat/> */}
          <input className="name" onChange={event => handleChangeName(event)} required placeholder="Enter your name"/><br />
          <input className="room" onChange={event => handleChangeRoom(event)} required placeholder="Enter your room" /><br />
          <button className="submitB" type="submit">Submit</button>
          {/* <button onClick={() => window.open("http://localhost:3000/Food-Ashur-s/Food-Ashurs-Full-App")}>
Click to open chat
</button> */}
        </form>
      </div>
    );
  }; // end of ChatChannel Component

  export default ChatChannel;