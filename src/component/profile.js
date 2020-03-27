import React, {useState, useEffect,  useContext} from 'react';
import Model from './modal';
import {When} from './if';
import { LoginContext } from '../component/auth/context.js';
import cartPhoto from '../assets/profile-picture.jpg';

function Profile (props){
  const settingsContext = useContext(LoginContext);
  const [photo, setPhoto] = useState(cartPhoto);
  const [img, setImg] = useState('');
  console.log(settingsContext);
 
  const imageHandeler = img => setImg(img);
  const handelPhoto = img => setPhoto(img);
  return (
    <>
      <ul>
        <img src={photo} href='profile-photo'  height="200" width="200"/>
        <form onClick={handelPhoto}>
          <input type='file' value={imageHandeler}/>
          <button>Add Profile photo</button>
        </form>
        <li>{settingsContext.user.username}</li>
        <li>{settingsContext.user.capabilities}</li>
        <li>{settingsContext.user.userEamil}</li>

      </ul>
    </>
  );
}

export default Profile;