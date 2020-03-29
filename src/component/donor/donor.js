/* eslint-disable no-undefined */
import React, {useState, useEffect} from 'react';
import {Link , NavLink} from 'react-router-dom';
import Model from '../modal';
import {When} from '../if';
import cartPhoto from '../../assets/cart.gif';
import donatePhoto from '../../assets/donate-form.gif';

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
import Recipients from '../resipient/resipient';

const easternfoodArray = [easternfood0, easternfood1, easternfood2, easternfood3];
const fastfoodArray = [fastfood0, fastfood1, fastfood2, fastfood3];
const dessertsArray = [desserts0, desserts1, desserts2, desserts3];



const donorsAPI = 'https://food--ashurs.herokuapp.com/api/v1/donor';

function Donors (props){

  const [donorList, setDonorList] = useState([]);
  const [donation, setDonation] = useState([]);
  const [item, setItem] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [updated, setUpdate] = useState({});
  const [ num, setNum] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showForm, setshowForm] = useState(false);

  const handelInputChange = e => {
    setItem({...item, [e.target.name]: e.target.value});
  };

  const callAPI = (url, method , body, handler, errorHandler) => {
    return fetch(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
      .then( response => response.json())
      .then(data => typeof handler === 'function' ? handler(data) : null )
      .catch( (e) => typeof errorHandler === 'function' ? errorHandler(e) : console.error(e)  );
  };

  const addItem = e => {
    e.preventDefault();
    e.target.reset();

    const _updateState  = newItem => setDonation([newItem]);
    callAPI(donorsAPI, 'POST', item, _updateState );
    setNum(Math.floor(Math.random() * 4));
    setshowForm(false);
  };

  const deleteItem = id =>{
    setDonation([]);
    const _updateState  = results =>{};
    callAPI(`${donorsAPI}/${id}`, 'DELETE', undefined, _updateState );
  };


  const handelUpdateChange = e => {
    setUpdate({...updated, [e.target.name]: e.target.value});
  };

  const UpdteItem = e =>{
    e.preventDefault();
    console.log(updated);
    setDonation([updated]);
    const updateHandeler  = newItem =>{};
    callAPI(`${donorsAPI}/${updated._id}`, 'PUT', updated, updateHandeler );
    setShowUpdate(!showUpdate);

  };
  const getdonorList = () => {
    const _updateState = data =>
      setDonorList(data.results);
    callAPI( 'https://food--ashurs.herokuapp.com/api/v1/recipient', 'GET', undefined, _updateState );
  };
  useEffect(() => {
    getdonorList();
  });

  const toggleDetails = item => {
    setDetails(item);
    setShowDetails(!showDetails);
  };

  const toggleUpdate = updatedItem => {
    setUpdate(updatedItem);
    setShowUpdate(!showUpdate);
  };

  const handelUpdateCartChange = e => {
    setUpdate({...updated, [e.target.name]: e.target.value});
  };

  const toggleCartDetails = item => {
    setDetails(item);
    setShowDetails(!showDetails);
  };

  const toggleCartUpdate = item => {
    setUpdate(item);
    setShowUpdate(!showUpdate);
  };

  const deleteCartItem = id => {
    let newCartList = cartList.filter( item => item._id !== id );
    setCartList(newCartList);
  };

  const UpdteCartItem = e =>{
    e.preventDefault();
    setCartList(cartList.map(item => item._id === updated._id ? updated : item));
    setShowUpdate(!showUpdate);
  };
  const toggleCart = () => setShowCart(!showCart);

  const addCart = recipient => {
    for (let i = 0; i < cartList.length; i++) {
      if(recipient._id === cartList[i]._id) return;
    }
    setCartList([...cartList, recipient]);
  };
  const toggleForm = e => {
    e.preventDefault();
    setshowForm(true);
  };

  return (
    <>

      <h1>Donors</h1>
      <img src={cartPhoto} onClick={toggleCart}  height="100" width="200"/>
      {!showForm && (<img src={donatePhoto} onClick={toggleForm}  height="100" width="200"/>)}
      {showForm && (
        <form onSubmit={addItem}>
          <input type='text' name='name' placeholder='type your name' onChange={handelInputChange} required />
          <label> Eastern Food
            <input type='radio' name='type' value='eastern food'  onClick={handelInputChange} required />
          </label>
          <label> Fast Food
            <input type='radio' name='type' value='fast food' onClick={handelInputChange} required />
          </label>
          <label> Desserts
            <input type='radio' name='type' value='desserts' onClick={handelInputChange} required />
          </label>
          <input type='text' name='available_time' placeholder='type your available_time' onChange={handelInputChange} required />
          <input type='number' name='amount' placeholder='type your amount' onChange={handelInputChange} />

          <button>Submit</button>
        </form>
      )}
      -------------------- Your Donation Data --------------------------
      {donation.map((item,i)=>{
        let src = item.type === 'eastern food' ? easternfoodArray[num] : item.type === 'fast food' ? fastfoodArray[num] : dessertsArray[num];
        return <div key={i}>
          <h3>{item.name}</h3>
          <h3>{item.type}</h3>
          <h3>{item.available_time}</h3>
          <h3>{item.amount}</h3>
          <img src={src} height="200" width="200" />
          <button onClick={()=> deleteItem(item._id)}>DELETE</button>
          <button onClick={()=> toggleUpdate(item)}>Update</button>

        </div>;
      })}
      <div>
        -------------------- Recipient Request --------------------------
        {donorList.map((donor, idx) =>{
          let src = donor.requestType === 'eastern food' ? easternfoodArray[num] : donor.requestType === 'fast food' ? fastfoodArray[num] : dessertsArray[num];
          return <ul key={idx}>
            <li>
              {donor.name}
              <img src={src} height="200" width="200" />
            </li>

            <button onClick={()=> toggleDetails(donor)}>More Detail</button>
            <button onClick={()=> addCart(donor)}>Add To Cart</button>

          </ul>;
        })}
      </div>
      <When condition={showDetails}>
        <Model title='Recipient details' close={toggleDetails}>
          <div className="recipient-details">
            <header>
              <li>Name: {details.name}   </li>
              <li>Donation Type: {details.requestType}   </li>
              <li>Contact Number: {details.contactNumber}   </li>
              <li>Identity: {details.identity}   </li>

            </header>
            <div className="item">
                Description: {details.description}
            </div>
          </div>
        </Model>
      </When>
      <When condition={showUpdate}>
        <Model title='Recipient update' close={toggleUpdate}>
          <div className="recipient-updated">
            <form onSubmit={UpdteItem} value={updated}>
              <input type='hidden' name='_id' value={details._id} />
              <input type='text' name='name' placeholder='type your name' defaultValue={updated.name} onChange={handelUpdateCartChange} required />
              <br/>
              <label> Eastern Food
                <input type='radio' name='type' value='eastern food' onClick={handelUpdateCartChange} required />
              </label>
              <label> Fast Food
                <input type='radio' name='type' value='fast food' onClick={handelUpdateCartChange} required />
              </label>
              <label> Desserts
                <input type='radio' name='type' value='desserts' onClick={handelUpdateCartChange} required />
              </label>
              <br/>
              <input type='text' name='available_time' placeholder='type your available_time' defaultValue={updated.available_time} onChange={handelUpdateCartChange} required />
              <br/>
              <input type='number' name='amount' placeholder='type your amount' defaultValue={updated.amount} onChange={handelUpdateCartChange} />
              <br/>
              <br/>
              <button >Submit</button>
            </form>
          </div>
        </Model>
      </When>
      <When condition={showCart}>
        <Model title='cart list' close={toggleCart}>

          {
            cartList.map((item, i)=>{
              return <ul key={i}>
                <li>{item.name}</li>
                <button onClick={()=> toggleCartDetails(item)}>More Detail</button>
                <button onClick={()=> toggleCartUpdate(item)}>Update</button>
                <button onClick={()=> deleteCartItem(item._id)}>DELETE</button>
              </ul>;
            })
          }

          <When condition={showDetails}>
            <Model title='cart details' close={toggleDetails}>
              <div className="cart-details">
                <header>
                  <li>Name: {details.name}   </li>
                  <li>Donation Type: {details.requestType}   </li>
                  <li>Contact Number: {details.contactNumber}   </li>
                  <li>Identity: {details.identity}   </li>

                </header>
                <div className="item">
                Description: {details.description}
                </div>
              </div>
            </Model>
          </When>
          <When condition={showUpdate}>
            <Model title='Recipient update' close={toggleUpdate}>
              <div className="recipient-updated">
                <form onSubmit={UpdteCartItem} value={updated}>
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

            </Model>
          </When>
        </Model>
      </When>
    </>
  );
}

export default Donors;
