import React from 'react';
import {Link , NavLink} from 'react-router-dom';

export default function Header (props){

  return(
    <header>
      <h1>
        Food Ashurs App
      </h1>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <NavLink to='/profile'>profile</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}