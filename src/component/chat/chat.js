// Chat channel by using hooks and socket-client
import React, { useState } from 'react'; // we use UsState hook to render the componenet once we update app state
import './index.scss';


export default () => {
    const [id, setId] = useState(""); // set the ID for the user 
    const [nameInput, setNameInput] = useState(""); // User's name 
    const [room, setRoom] = useState(""); // chat Rooms
  
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
        // for user's login and logout 
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