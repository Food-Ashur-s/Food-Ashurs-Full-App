import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import App from './app.js';

function Entry() {
    return (
        // <Provider store={store}>
            <App />
        // </Provider>
    )

} // end of Entry Function 

const enrtyPoint = document.getElementById('root');
ReactDom.render(<Entry />, enrtyPoint);