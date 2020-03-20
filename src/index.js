import React from 'react';
import ReactDom from 'react-dom';

import App from './app.js';

function Entry(){
    return (
        <React.Fragment>
            <App/>
        </React.Fragment>
    )
  
} // end of Entry Function 

const enrtyPoint = document.getElementById('root');
ReactDom.render(<Entry />,enrtyPoint);