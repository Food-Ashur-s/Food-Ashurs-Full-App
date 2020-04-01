import React from 'react';
import './loading.scss';
import imgSpinner from '../../assets/logo-spinner.png';
import WOW from 'wowjs';

class Spinner extends React.Component{
  componentDidMount(){
    // AOS.init();
    const wow = new WOW.WOW();
    wow.init();
  }
  render(){
    return(
      <React.Fragment>
        <div id="bigloading">
          <img src={imgSpinner} className="wow bounce img-spinner" data-wow-iteration="100" />
          <div id="loading">
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div id="lefthalf"></div>
          <div id="righthalf"></div>
        </div>
      </React.Fragment>);
  }
}

export default Spinner;