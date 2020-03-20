import React from 'react';
import Header from './component/header/header.js';
import Footer from './component/footer/footer.js';
import Donor from './component/donor/donor.js';
import { Provider } from 'react-redux';
import store from './store/index.js';

// import './app.scss';

function app() {
    return (
        <Provider store={store}>
            <Header />
            <Donor />
            <Footer />
        </Provider>
    )
} // end of app function 

export default app;