/* eslint-disable no-unused-vars */


import React from 'react';
//---------- Redux------------//
import { Provider } from 'react-redux';
import store from './store/index.js';
import Donor from './component/donor/donor.js';
//-----------------------------//
import Header from './component/header/header.js';
import Footer from './component/footer/footer.js';

export default (props) => {
  return(
    <Provider store={store}>
      <Header/>
      {/* <Donor/> */}
      <Footer/>
    </Provider>
  );
};

