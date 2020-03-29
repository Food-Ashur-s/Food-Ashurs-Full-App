/* eslint-disable no-undefined */
import React, {useState, useEffect} from 'react';
import {Link , NavLink} from 'react-router-dom';
import Model from '../modal';
import {When} from '../if';
import cartPhoto from '../../assets/cart.gif';
import recipientPhoto from '../../assets/recipient-form.jpg';

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

function Recipients (props){

  const [recipientList, setRecipientList] = useState([]);
  const [item, setItem] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [updated, setUpdate] = useState({});
  const [ num, setNum] = useState(0);
  const [resultsList, setResultstList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showForm, setshowForm] = useState(false);
  const [numberOfCart, setNumberOfCart] = useState(0);

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

    const postHandeler  = newItem => setRecipientList([newItem]);
    callAPI(recipientsAPI, 'POST', item, postHandeler );
    setNum(Math.floor(Math.random() * 4));
    setshowForm(false);
  };

  const deleteItem = id =>{
    const deleteHandeler  = results => setRecipientList(recipientList.filter(recipient=> recipient._id !== id));
    callAPI(`${recipientsAPI}/${id}`, 'DELETE', undefined, deleteHandeler );
    setRecipientList([]);
  };

  const handelUpdateChange = e => {
    setUpdate({...updated, [e.target.name]: e.target.value});
  };

  const UpdteItem = e =>{
    e.preventDefault();
    console.log(updated);
    const postHandeler  = updated => setRecipientList([updated]);
    callAPI(recipientsAPI, 'POST', updated, postHandeler );
    setShowUpdate(!showUpdate);
  };

  const getRecipientList = () => {
    const getHandeler = data => setResultstList(data.results);
    callAPI('https://food--ashurs.herokuapp.com/api/v1/donor', 'GET', undefined, getHandeler );

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
  ///////////////////////////////////////////
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
    setNumberOfCart(numberOfCart - 1);
  };

  const UpdteCartItem = e =>{
    e.preventDefault();
    setCartList(cartList.map(item => item._id === updated._id ? updated : item));
    setShowUpdate(!showUpdate);
  };
  const toggleCart = () => setShowCart(!showCart);

  const addCart = donor => {
    for (let i = 0; i < cartList.length; i++) {
      if(donor._id === cartList[i]._id) return;
    }
    setCartList([...cartList, donor]);
    setNumberOfCart(numberOfCart + 1);
  };
  const toggleForm = e => {
    e.preventDefault();
    setshowForm(true);
  };


  return (
    <>
      <h1>Recipients</h1>
      {!showForm && (<img src={recipientPhoto} onClick={toggleForm}  height="100" width="200"/>)}
      {showForm && (
        <form onSubmit={addItem}>
          <input type='text' name='name' placeholder='type your name' onChange={handelInputChange} required />
          <label> Eastern Food
            <input type='radio' name='requestType' value='eastern food'  onClick={handelInputChange} required />
          </label>
          <label> Fast Food
            <input type='radio' name='requestType' value='fast food' onClick={handelInputChange} required />
          </label>
          <label> Desserts
            <input type='radio' name='requestType' value='desserts' onClick={handelInputChange} required />
          </label>
          <input type='text' name='identity' placeholder='type your identity' onChange={handelInputChange} required />
          <input type='number' name='contactNumber' placeholder='type your contactNumber' onChange={handelInputChange} required />
          <input type='text' name='description' placeholder='description' onChange={handelInputChange} />

          <button>Submit</button>
        </form> )}
      <img src={cartPhoto} onClick={toggleCart}  height="100" width="200"/>
       --------------------------------------------------------------------------------
      <div>Your Order
        {recipientList.map((recipient, idx) =>{
          let src = recipient.requestType === 'eastern food' ? easternfoodArray[num] : recipient.requestType === 'fast food' ? fastfoodArray[num] : dessertsArray[num];
          return <div key={idx}>
            <h3>{recipient.name}</h3>
            <h4>{recipient.identity}</h4>
            <h4>{recipient.requestType}</h4>
            <h4>{recipient.contactNumber}</h4>
            <img src={src} height="200" width="200" />
            <p>{recipient.description}</p>

            <button onClick={()=> deleteItem(recipient._id)}>DELETE</button>
            ----------------------------------------------------------------------------
            <section> Results Request
              <h2>Results Match Your Request: {recipient.requestRecipient.length || 0}</h2>
              {recipient.requestRecipient.map(item=>{
                return <ul key={idx}>
                  <li>
                    {item.name}
                    <img src={src} height="200" width="200" />
                  </li>
                  <button onClick={()=> toggleDetails(item)}>More Detail</button>
                  <button onClick={()=> addCart(item)}>Add To Cart</button>
                </ul>;
              })}
            </section>
          </div>;
        })}
      </div>
      -------------------------------------------------------------------------------------
      <div> Donations Available
        {resultsList.map((item, i)=>{
          let src = item.type === 'eastern food' ? easternfoodArray[num] : item.type === 'fast food' ? fastfoodArray[num] : dessertsArray[num];
          return <ul key={i}>
            <li>{item.name}</li>
            <img src={src} height="200" width="200" />
            <button onClick={()=> toggleDetails(item)}>More Detail</button>
            <button onClick={()=> addCart(item)}>Add To Cart</button>
          </ul>;
        })}
      </div>
      -----------------------------------------------------------------------
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


      <When condition={showCart}>
        <Model title='cart list' close={toggleCart}>
          <header>Number Of Your Cart: {numberOfCart}</header>
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
            <Model title='cart update' close={toggleUpdate}>
              <div className="cart-updated">
                <form onSubmit={UpdteCartItem} value={details._id}>
                  <label>
                    <input type='hidden' name='_id' value={details._id} />
                  </label>
                  <label> name
                    <input type='text' name='name' placeholder='type your name' defaultValue={updated.name} onChange={handelUpdateChange} required />
                  </label>
                  <br/>
                  <label> Eastern Food
                    <input type='radio' name='type' value='eastern food' onClick={handelUpdateChange} required />
                  </label>
                  <label> Fast Food
                    <input type='radio' name='type' value='fast food' onClick={handelUpdateChange} required />
                  </label>
                  <label> Desserts
                    <input type='radio' name='type' value='desserts' onClick={handelUpdateChange} required />
                  </label>
                  <br/>
                  <label> available_time
                    <input type='text' name='available_time' placeholder='type your available_time' defaultValue={updated.available_time} onChange={handelUpdateChange} required />
                  </label>
                  <br/>
                  <label>amount
                    <input type='number' name='amount' placeholder='type your amount' defaultValue={updated.amount} onChange={handelUpdateChange} />
                  </label>
                  <br/>
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

export default Recipients;
