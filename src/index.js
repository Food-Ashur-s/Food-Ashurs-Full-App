import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';


function Entry (){
  return (
    <App />
  )
}

const rootPoint = document.getElementById('root');
ReactDOM.render(<Entry />, rootPoint);