/* eslint-disable no-unused-vars */


import React , {useState} from 'react';
import '../header/header.scss';
import $ from 'jquery';
import logo from '../../assest/mainLogo.PNG';
window.$ = window.jQuery = require('jquery');

const Header = (props) =>{

  const handleClick = () =>{
    $(document).ready(function() {
      $(document).delegate('.open', 'click', function(event){
        $(this).addClass('oppenned');
        event.stopPropagation();
      });
      $(document).delegate('body', 'click', function(event) {
        $('.open').removeClass('oppenned');
      });
      $(document).delegate('.cls', 'click', function(event){
        $('.open').removeClass('oppenned');
        event.stopPropagation();
      });
    });
  };
  //   const [open , setOpen] = useState(false);

  return (
    <>
      <div className='header-containar'>
        <img src={logo} height="70px" width="200px"/>
        <h1>Food Ashurs</h1>
        <div  className="open" onClick={handleClick}>
          <span className="cls"></span>
          <span>
            <ul className="sub-menu ">
              <li>
                <a href="#profile" title="profile">My Account</a>
              </li>
              <li>
                <a href="#Donor" title="Donor">Donor</a>
              </li>
              <li>
                <a href="#resipient" title="resipient">Order</a>
              </li>
              <li>
                <a href="#aboutUs" title="aboutUs">About Us</a>
              </li>
              <li>
                <a href="#setting" title="setting">Log Out</a>
              </li>
            </ul>
          </span>
          <span className="cls"></span>
        </div>
      </div>
    </>
  );
};

export default Header;