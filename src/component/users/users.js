/* eslint-disable no-undefined */
import React, { useState, useEffect } from 'react';
import Model from '../modal';
import { When } from '../if';

const usersAPI = 'https://food--ashurs.herokuapp.com';

function Users(props) {

   const [usersList, setUsersList] = useState([]);
   const [user, setUser] = useState({});
   const [showDetails, setShowDetails] = useState(false);
   const [details, setDetails] = useState({});
   const [showUpdate, setShowUpdate] = useState(false);
   const [updated, setUpdate] = useState({});

   const handelInputChange = e => {
      console.log('user : ', user);
      setUser({ ...user, [e.target.name]: e.target.value });
   };


   const callAPI = (url, method, body, handler, errorHandler) => {
      return fetch(url, {
         method: method,
         mode: 'cors',
         cache: 'no-cache',
         headers: { 'Content-Type': 'application/json' },
         body: body ? JSON.stringify(body) : undefined,
      })
         .then(response => response.json())
         .then(data => typeof handler === 'function' ? handler(data) : null)
         .catch((e) => typeof errorHandler === 'function' ? errorHandler(e) : console.error(e));
   };

   const addUser = e => {
      e.preventDefault();
      e.target.reset();
      console.log('usersList : ', usersList);
      const _updateState = newUser => setUsersList([...usersList, newUser]);
      callAPI(usersAPI, 'POST', user, _updateState);
   };

   const deleteItem = id => {
      const _updateState = results => setUsersList(usersList.filter(user => user._id !== id));
      callAPI(`${usersAPI}/${id}`, 'DELETE', undefined, _updateState);
   };


   const handelUpdateChange = e => {
      setUpdate({ ...updated, [e.target.name]: e.target.value });
   };

   const UpdteItem = e => {
      e.preventDefault();
      console.log(updated);

      const updateHandeler = newUser =>
         setUsersList(usersList.map(user => user._id === newUser._id ? newUser : user));
      callAPI(`${usersAPI}/${updated._id}`, 'PUT', updated, updateHandeler);
      setShowUpdate(!showUpdate);

   };
   const getdonorList = () => {
      const _updateState = data =>
         setUsersList(data.results);
      callAPI(usersAPI, 'GET', undefined, _updateState);
   };
   useEffect(() => {
      getdonorList();
   }, [usersList]);

   const toggleDetails = id => {
      let details = usersList.filter(user => user._id === id)[0] || {};
      setDetails(details);
      setShowDetails(!showDetails);
   };

   const toggleUpdate = id => {
      let updated = usersList.filter(user => user._id === id)[0] || {};
      setUpdate(updated);
      setShowUpdate(!showUpdate);
   };

   return (
      <>
         <h1>Welcome To User's Page / Login</h1>

         <form onSubmit={addUser}>
            <input type='text' name='username' placeholder='Enter your Username' onChange={handelInputChange} required />
            <input type='password' name='password' placeholder='Enter your Password' onChange={handelInputChange} required />
            <input type='text' name='email' placeholder='Enter your Email ( Optional )' onChange={handelInputChange} />
            <label> Choose User Type :
        <label>
                  <input type='radio' name='role' value='recipients' onClick={handelInputChange} required />
          Recipients</label>
               <label>
                  <input type='radio' name='role' value='donors' onClick={handelInputChange} required />
          Donors</label>
            </label>
            <button>Login</button>
         </form>

         <div>
            {usersList.map((user, idx) => {
               return <ul key={idx}>
                  <li>
                     {user.name}
                  </li>
                  <button onClick={() => toggleDetails(user._id)}>More Detail</button>
                  <button onClick={() => toggleUpdate(user._id)}>Update</button>
                  <button onClick={() => deleteItem(user._id)}>DELETE</button>
               </ul>;
            })}
         </div>
         <When condition={showDetails}>
            <Model title='Users details' close={toggleDetails}>
               <div className="Users-details">
                  <header>
                     <li>Username: {details.name}   </li>
                     <li>Email : {details.email}   </li>
                     <li>User Role: {details.role}   </li>
                  </header>
               </div>
            </Model>
         </When>
         <When condition={showUpdate}>
            <Model title='Users update' close={toggleUpdate}>
               <div className="Users-updated">
                  <form onSubmit={UpdteItem} value={updated}>
                     <input type='hidden' name='_id' value={details._id} />
                     <input type='text' name='username' placeholder='Change Your Username' defaultValue={updated.username} onChange={handelUpdateChange} required />
                     <br />
                     <input type='password' name='password' placeholder='Change your Password' defaultValue={updated.password} onChange={handelUpdateChange} required />
                     <br />
                     <input type='text' name='email' placeholder='Change your Email ( Optional )' defaultValue={updated.email} onChange={handelUpdateChange} />
                     <br />
                     <label>
                        <input type='radio' name='type' value='recipients' onClick={handelUpdateChange} required />
                Recipients </label>
                     <label>
                        <input type='radio' name='type' value='donors' onClick={handelUpdateChange} required />
                Donors </label>
                     <br />
                     <br />
                     <button >Submit</button>
                  </form>
               </div>
            </Model>
         </When>
      </>
   );
}

export default Users;