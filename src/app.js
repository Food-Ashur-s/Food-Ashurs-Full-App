import React from 'react';
import Header from './component/header/header.js';
import Footer from './component/footer/footer.js';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from './store/donor-action.js';

// import './app.scss';

function app() {
    return (
        <React.Fragment>
            <Header />
            <Footer />
        </React.Fragment>
    )
} // end of app function 

export default app;