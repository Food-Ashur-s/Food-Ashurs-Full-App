import React from 'react';
import ReactDom from 'react-dom';

import App from './app.js';

function Entry() {
    return (
            <App />
    )

} // end of Entry Function 

const enrtyPoint = document.getElementById('root');
ReactDom.render(<Entry />, enrtyPoint);