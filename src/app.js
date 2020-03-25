import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

// import logo from './logo.svg';

class App extends Component {
  componentDidMount() {
    addResponseMessage("Welcome to our awesome chat!");
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  }

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title="Food-Ashur's"
          subtitle="Chat-App"
        />
      </div>
    );
  } 
}

export default App;