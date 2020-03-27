// Chat channel by using hooks and socket-client
import React, { useState , useEffect} from 'react'; // we use UsState hook to render the componenet once we update app state
import useSocket from 'use-socket.io-client';
import { useImmer } from 'use-immer';
// import './chat.scss';

// Component to render users messagess (from google)
const Messages = props => props.data.map(msg => msg[0] !== '' ? (<li><strong>{msg[0]}</strong> : <div className="innermsg">{msg[1]}</div></li>) : (<li className="update">{msg[1]}</li>) );

// Component to check the users status (from google)
const Online = props => props.data.map(onlineStatus =>
<li id={onlineStatus[0]}>{onlineStatus[1]}</li> );

export default () => {
    const [id, setId] = useState(''); // set the ID for the user 
    const [nameInput, setNameInput] = useState(''); // User's name 
    const [room, setRoom] = useState(''); // chat Rooms
    const [input, setInput] = useState('');
  
    // bulid-in socket
    const [socket] = useSocket('https://open-chat-naostsaecf.now.sh');
    socket.connect();
  
    // update our messages to avoid duplicated 
    const [messages, setMessages] = useImmer([]);
  
    const [online, setOnline] = useImmer([]);
  
    useEffect(()=>{
      socket.on('message que',(nick,message) => {
        setMessages(draft => {
          draft.push([nick,message])
        })
      });
  
      socket.on('update',message => setMessages(draft => {
        draft.push(['',message]);
      }))
  
      socket.on('people-list',people => {
        let newState = [];
        for(let person in people){
          newState.push([people[person].id,people[person].nick]);
        }
        setOnline(draft=>{draft.push(...newState)});
        console.log(online)
      });
  
      socket.on('add-person',(nick,id)=>{
        setOnline(draft => {
          draft.push([id,nick])
        })
      })
  
      socket.on('remove-person',id=>{
        setOnline(draft => draft.filter(m => m[0] !== id))
      })
  
      socket.on('chat message',(nick,message)=>{
        setMessages(draft => {draft.push([nick,message])})
      })
    },0);
  
    const handleSubmit = e => {
      e.preventDefault();
      if (!nameInput) {
        return alert("Name can't be empty , Enter a Name");
      }
      setId(nameInput);
      socket.emit("join", nameInput,room);
    };
  
    const handleSend = e => {
      e.preventDefault();
      if(input !== ''){
        socket.emit('chat message',input,room);
        setInput('');
      }
    }
  
    return id ? (
      <section style={{display:'flex',flexDirection:'row'}} >
        <ul id="messages"><Messages data={messages} /></ul>
        <ul id="online"> People Online List : <Online data={online} /> </ul>
        <div id="sendform">
          <form onSubmit={e => handleSend(e)} style={{display: 'flex'}}>
              <input id="m" onChange={e=>setInput(e.target.value.trim())} placeholder="Type a Message Then press Enter "/><button style={{width:'75px'}} type="submit">Send</button>
          </form>
        </div>
      </section>
    ) : (
      <div style={{ textAlign: "center", margin: "50px auto", width: "75%" }}>
        <form onSubmit={event => handleSubmit(event)}>
        <div> Food Ashur's Chat </div>
          <input id="name" onChange={e => setNameInput(e.target.value.trim())} required placeholder="Enter your name" /><br />
          <input id="room" onChange={e => setRoom(e.target.value.trim())} placeholder="Enter your room" /><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

/*
// Our Components
export default () => {
  
    // check if the user enter his name or not , then creat an ID and room name for him 
    const handleSubmit = e => {
      e.preventDefault();
      // if no name entered 
      if (!nameInput) {
        return alert("Name can't be empty , Enter a Name ");
      }
      // set User's ID 
      setId(name);
      // emit the event nce user entered his correct name 
      socket.emit("join", name, room);
    };
  
    return id !== '' ? (
        
      <div>Hello</div>
    ) : (
      <div style={{ textAlign: "center", margin: "50px auto", width: "75%" }}>
        <form onSubmit={event => handleSubmit(event)}>
          <input
            id="name"
            onChange={e => setNameInput(e.target.value.trim())}
            required
            placeholder="Enter your name"
          />
          <br />
          <input
            id="room"
            onChange={e => setRoom(e.target.value.trim())}
            placeholder="Enter your room"
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  */