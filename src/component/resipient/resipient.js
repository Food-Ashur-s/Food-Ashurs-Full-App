/* eslint-disable no-undefined */
import React, { useState, useEffect } from 'react';
import Model from '../modal';
import { When } from '../if';
import './resipient.scss';


import desserts0 from '../../assets/desserts-0.jpg';
import desserts1 from '../../assets/desserts-1.jpg';
import desserts2 from '../../assets/desserts-1.jpg';
import desserts3 from '../../assets/desserts-1.jpg';

import easternfood0 from '../../assets/eastern-food-0.jpg';
import easternfood1 from '../../assets/eastern-food-1.jpg';
import easternfood2 from '../../assets/eastern-food-2.jpg';
import easternfood3 from '../../assets/eastern-food-3.jpg';

import fastfood0 from '../../assets/fast-food-0.jpg';
import fastfood1 from '../../assets/fast-food-1.jpg';
import fastfood2 from '../../assets/fast-food-2.jpg';
import fastfood3 from '../../assets/fast-food-3.jpg';

const easternfoodArray = [easternfood0, easternfood1, easternfood2, easternfood3];
const fastfoodArray = [fastfood0, fastfood1, fastfood2, fastfood3];
const dessertsArray = [desserts0, desserts1, desserts2, desserts3];


const recipientsAPI = 'https://food--ashurs.herokuapp.com/api/v1/recipient';

function Recipients(props) {

  const [recipientList, setRecipientList] = useState([]);
  const [item, setItem] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [updated, setUpdate] = useState({});
  const [num, setNum] = useState(0);
  const [resultsList, setResultstList] = useState([]);

  const handelInputChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
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

  const addItem = e => {
    e.preventDefault();
    e.target.reset();

    const postHandeler = newItem => setRecipientList([newItem]);
    callAPI(recipientsAPI, 'POST', item, postHandeler);
    setNum(Math.floor(Math.random() * 4));
  };

  const deleteItem = id => {
    const deleteHandeler = results => setRecipientList(recipientList.filter(recipient => recipient._id !== id));
    callAPI(`${recipientsAPI}/${id}`, 'DELETE', undefined, deleteHandeler);
    setRecipientList([]);
  };

  const handelUpdateChange = e => {
    setUpdate({ ...updated, [e.target.name]: e.target.value });
  };

  const UpdteItem = e => {
    e.preventDefault();
    console.log(updated);
    const postHandeler = updated => setRecipientList([updated]);
    callAPI(recipientsAPI, 'POST', updated, postHandeler);
    // const updateHandeler  = newItem => setRecipientList([newItem]);
    // callAPI(`${recipientsAPI}/${updated._id}`, 'PUT', updated, updateHandeler);
    setShowUpdate(!showUpdate);
  };

  const getRecipientList = () => {
    const getHandeler = data => setResultstList(data.results);
    callAPI('https://food--ashurs.herokuapp.com/api/v1/donor', 'GET', undefined, getHandeler);

  };
  useEffect(() => {
    getRecipientList();
  });

  const toggleDetails = item => {
    setDetails(item);
    setShowDetails(!showDetails);
  };

  const toggleUpdate = updatedItem => {
    setUpdate(updatedItem);
    console.log(updated);
    setShowUpdate(!showUpdate);
  };

  const addCart = donor => props.handelcart(donor);

  /*********************************************** Styling Part ****************************************************************/
  return (
    <>
      <div className="fixx"></div>
      <h1>Recipients</h1>

      <form onSubmit={addItem}>
        <input type='text' name='name' placeholder='type your name' onChange={handelInputChange} required />
        <label className="labelName">
          <input type='radio' name='requestType' value='eastern food' onClick={handelInputChange} required />
          Eastern Food </label>
        <label className="labelName" >
          <input type='radio' name='requestType' value='fast food' onClick={handelInputChange} required />
          Fast Food </label>
        <label className="labelName">
          <input type='radio' name='requestType' value='desserts' onClick={handelInputChange} required />
          Desserts </label>
        <input type='text' name='identity' placeholder='type your identity' onChange={handelInputChange} required />
        <input type='number' name='contactNumber' placeholder='type your contactNumber' onChange={handelInputChange} required />
        <input type='text' name='description' placeholder='description' onChange={handelInputChange} />

        <button>Submit</button>
      </form>
      -------------------------------------------------------------------------------
      <div className="recipients-list">Your Order's Details
        {recipientList.map((recipient, idx) => {
        let src = recipient.requestType === 'eastern food' ? easternfoodArray[num] : recipient.requestType === 'fast food' ? fastfoodArray[num] : dessertsArray[num];
        return <div key={idx} className="recipient-line"> Order's Details
          <h3 className="recipient-item-name"> Your Name : {recipient.name}</h3>
          <img src={src} className="donor-item-img" height="330" width="300" />
          <h4 className="recipient-item-name"> Request Type : {recipient.requestType}</h4>
          <h4 className="recipient-item-name">Identity Type : {recipient.identity}</h4>
          <h4 className="recipient-item-name"> Contact Number : {recipient.contactNumber}</h4>
          <p className="recipient-item-name">About Your Request :{recipient.description}</p>

          {/* <button onClick={()=> toggleUpdate(recipient)}>Update</button> */}
            <button onClick={() => deleteItem(recipient._id)}>DELETE</button>
       
      ----------------------------------------------------------------------------
            <section> Matching Results
              {recipient.requestRecipient.map(item => {
            return <ul key={idx}>
              <li>
                {item.name}
                <img src={src} height="200" width="200" />
              </li>
                <button onClick={() => toggleDetails(item)}>More Detail</button>
                <button onClick={() => addCart(item)}>Add To Cart</button>
            </ul>;
          })}
          </section>
        </div>;
      })}
      </div>
          -------------------------------------------------------------------------------------
      <div> Available Donations
        {resultsList.map((item, i) => {
        let src = item.type === 'eastern food' ? easternfoodArray[num] : item.type === 'fast food' ? fastfoodArray[num] : dessertsArray[num];

        return <ul key={i} className="recipient-line">
          <li className="recipient-item-name">{item.name}</li>
          <img src={src} className="donor-item-img" height="330" width="300" />
          <div className="div-buttons">
            <button onClick={() => toggleDetails(item)} className="recipient-item-button more">More Detail</button>
            <button onClick={() => addCart(item)} className="recipient-item-button">Add To Cart</button>
          </div>
        </ul>;
      })}
      </div>
      <When condition={showDetails}>
        <Model title='Donor details' close={toggleDetails}>
          <div className="donor-details">
            <header>
              <li>Name: {details.name}   </li>
              <li>Donation Type: {details.type}   </li>
              <li>Available Time: {details.available_time}   </li>
            </header>
            <div className="item">
              Food Amount: {details.amount}
            </div>
          </div>
        </Model>
      </When>
      <When condition={showUpdate}>
        {/* <Model title='Recipient update' close={toggleUpdate}>
          <div className="recipient-updated">
            <form onSubmit={UpdteItem} value={updated}>
              <input type='hidden' name='_id' value={details._id} />
              <input type='text' name='name' placeholder='type your name' defaultValue={updated.name} onChange={handelUpdateChange} required />
              <br/>
              <label> Eastern Food
                <input type='radio' name='requestType' value='eastern food' onClick={handelUpdateChange} required />
              </label>
              <label> Fast Food
                <input type='radio' name='requestType' value='fast food' onClick={handelUpdateChange} required />
              </label>
              <label> Desserts
                <input type='radio' name='requestType' value='desserts' onClick={handelUpdateChange} required />
              </label>
              <br/>
              <input type='text' name='identity' placeholder='type your identity' defaultValue={updated.identity} onChange={handelUpdateChange} required />
              <br/>
              <input type='number' name='contactNumber' placeholder='type your contactNumber' defaultValue={updated.contactNumber} onChange={handelUpdateChange} required />
              <br/>
              <input type='text' name='description' placeholder='description'  defaultValue={updated.description} onChange={handelUpdateChange} />
              <br/>
              <button >Submit</button>
            </form>
          </div>
        </Model> */}
      </When>
    </>
  );
}

export default Recipients;