/* eslint-disable no-unused-vars */
/* eslint-disable no-undefined */
import React, {useState, useEffect} from 'react';
import {Link , NavLink} from 'react-router-dom';
import Model from '../modal';
import {When} from '../if';
import cartPhoto from '../../assets/cart.gif';
import recipientPhoto from '../../assets/recipient-form.jpg';

import './resipient.scss';
import AOS from 'aos';

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
  AOS.init();
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
    setshowForm(!showForm);
  };

  return (
    <>
      {/* <div className="cart-div" data-aos="fade-right"
        data-aos-offset="100"
        data-aos-easing="ease-in-sine">
        <header className="cart-count">{numberOfCart}</header>
        <i className="fa fa-cart-plus curt-item" aria-hidden="true" onClick={toggleCart} ></i></div> */}
      <section className="block-donor">
        <div className="donation-div">
          <h3 data-aos="zoom-in-up" data-aos-duration="1000" className="donor-header">Recipients</h3>
          <span className="space-span"></span>
          <p data-aos="fade-left" data-aos-duration="1000" className="donation-p">“Every man must decide whether he will walk in the light of creative altruism or in the darkness of destructive selfishness.”</p>
          <p data-aos="fade-right" data-aos-duration="1000" className="donation-p">“Love is not patronizing and charity isn't about pity, it is about love. Charity and love are the same -- with charity you give love, so don't just give money but reach out your hand instead.”</p>
          <div className="donation-href-div">
            <div className="cart-div" data-aos="fade-right"
              data-aos-offset="100"
              data-aos-easing="ease-in-sine">
              <header className="cart-count">{numberOfCart}</header>
              <i className="fa fa-cart-plus curt-item" aria-hidden="true" onClick={toggleCart} ></i></div>
            { !showForm &&  (<button  data-aos="zoom-in-up" data-aos-duration="1000" onClick={toggleForm} className="donation-button"> Make Request</button>)}
          </div>
          {showForm && (
            <Model title='donor-form' close={toggleForm}>
              <div className="addMeal-div">
                <div className="addMeal-form" >
                  <form onSubmit={addItem} className="add-form">
                    <label className="form-lable-">Request name:</label>
                    <input type='text' name='name' placeholder='type your name' className="update-input" onChange={handelInputChange} required />

                    <div className="form-lable-r">
                      <label>
                        <input type='radio' name='requestType' className="update-input-r" value='eastern food'  onClick={handelInputChange} required /> Eastern Food
                      </label>
                      <label>
                        <input type='radio' name='requestType' className="update-input-r" value='fast food' onClick={handelInputChange} required /> Fast Food
                      </label>
                      <label>
                        <input type='radio' name='requestType' className="update-input-r" value='desserts' onClick={handelInputChange} required />Desserts
                      </label>
                    </div>
                    <label className="form-lable-">Amount:</label>
                    <input type='number' name='identity' className="update-input" placeholder='type your identity' onChange={handelInputChange} required />
                    <label className="form-lable-"> Contact Number</label>
                    <input type='number' className="update-input" name='contactNumber' placeholder='type your contact Number' onChange={handelInputChange} required />
                    <label className="form-lable-">description :</label>
                    <input type='text' className="update-input" name='description' placeholder='description' onChange={handelInputChange} />
                    <button className="form-button-">Submit</button>
                  </form>
                </div>
              </div>
            </Model>
          )}
          {/* <img src={cartPhoto} onClick={toggleCart}  height="100" width="200"/> */}
        </div>
        {/* <div>Your Order */}
        {recipientList.map((recipient, idx) =>{
          let src = recipient.requestType === 'eastern food' ? easternfoodArray[num] : recipient.requestType === 'fast food' ? fastfoodArray[num] : dessertsArray[num];
          return (
            <>
              <div key={idx} className="donor-line-section- div-aos" data-aos="zoom-in-up" data-aos-duration="2000">
                <div className="donor-item section-item">
                  <img src={src}className="section-donor-item-img" height="330px" width="300px" />
                  <div className="section-info">
                    <div className="section-donor-name">{recipient.name}</div>
                    <div className="section-donor-type">{recipient.identity}</div>
                    <div className="section-donor-type">{recipient.requestType}</div>
                    <div className="section-donor-type">{recipient.contactNumber}</div>
                    <div className="section-donor-type">{recipient.description}</div>
                  </div>
                  <div className="section-button">
                    <button onClick={()=> deleteItem(recipient._id)} className="donor-item-button-section-"><i className="fa fa-close info"></i>DELETE</button>
                  </div>
                </div>
              </div>
              <div className="result-req-div">
                <h4 data-aos="zoom-in-up" data-aos-duration="1500" className="recipient-header"> Result Request</h4>
                <section className="block-recipient">
                  <div className="recipient-list">
                    {recipient.requestRecipient.map(item=>{
                      return <div key={idx} className="donor-line div-aos" data-aos="zoom-in-up" data-aos-duration="2000">
                        <div className="donor-item">
                          <img src={src} className="donor-item-img" height="330" width="300" />
                          <div className="donor-item-name">
                            {item.name}
                          </div>
                        </div>
                        <div className="styles-div">
                          <div className="donor-item-div1" data-aos="fade-right"
                            data-aos-duration="1500" ></div>
                          <div className="donor-item-div2"data-aos="fade-left"
                            data-aos-duration="1700"></div>
                        </div>
                        <div className="div-buttons">
                          <button onClick={()=> toggleDetails(item)} className="donor-item-button"><i className="	fa fa-address-card-o info"></i>More Detail</button>
                          <button onClick={()=> addCart(item)}  className="donor-item-button"><i className="fa fa-cart-plus cart" ></i>Add To Cart</button>
                        </div>
                      </div>;
                    })}
                  </div>
                </section>
              </div>
            </>
          );
        })}
        {/* </div> */}
      </section>
      <h4 data-aos="zoom-in-up" data-aos-duration="1500" className="recipient-header"> Available Donor's</h4>
      <section className="block-recipient">
        <div className="recipient-list">
          {resultsList.map((item, i)=>{
            let src = item.type === 'eastern food' ? easternfoodArray[num] : item.type === 'fast food' ? fastfoodArray[num] : dessertsArray[num];
            return <div key={i} className="donor-line div-aos" data-aos="zoom-in-up" data-aos-duration="2000">
              <div className="donor-item">
                <img src={src} className="donor-item-img" height="330" width="300"/>
                <div className="donor-item-name">{item.name}</div>
              </div>
              <div className="styles-div">
                <div className="donor-item-div1" data-aos="fade-right"
                  data-aos-duration="1500" ></div>
                <div className="donor-item-div2"data-aos="fade-left"
                  data-aos-duration="1700"></div>
              </div>
              <div className="div-buttons">
                <button onClick={()=> toggleDetails(item)} className="donor-item-button"><i className="	fa fa-address-card-o info"></i>More Detail</button>
                <button onClick={()=> addCart(item)} className="donor-item-button"><i className="fa fa-cart-plus cart" ></i>Add To Cart</button>
              </div>
            </div>;
          // </div>
          })}
        </div>

        <When condition={showDetails}>
          <Model title='Donor details' close={toggleDetails}>
            <div className="recipient-details donor-details">
              <div className="detail-info">
                <div className="detail-name"><span>Name: </span> {details.name}   </div>
                <div className="detail-type"><span>Donation Type:</span>  {details.type}   </div>
                <div className="detail-type"><span>Available Time:</span>  {details.available_time}</div>
                <div  className="detail-type"><span>Food Amount:</span>  {details.amount}</div>
              </div>
            </div>
          </Model>
        </When>


        <When condition={showCart}>
          <Model title='cart list' close={toggleCart}>

            {
              cartList.map((item, i)=>{
                return <div key={i}>
                  <div className="cart-name">{item.name}</div>
                  <div className="cart-button-div">
                    <button onClick={()=> toggleCartDetails(item)} className="update-button-cart"><i className="	fa fa-address-card-o info"></i>More Detail</button>
                    <button onClick={()=> toggleCartUpdate(item)} className="update-button-cart"><i className="	fa fa-address-card-o info"></i>Update</button>
                    <button onClick={()=> deleteCartItem(item._id)} className="update-button-cart"><i className="fa fa-close info"></i>DELETE</button>
                  </div>
                </div>;
              })
            }

            <When condition={showDetails}>
              <div className="cart-details-m">
                <Model title='Donor details'  close={toggleDetails}>
                  <div className="recipient-details donor-details">
                    <div className="detail-info">
                      <div className="detail-name"><span>Name: </span> {details.name}   </div>
                      <div className="detail-type"><span>Donation Type:</span>  {details.type}   </div>
                      <div className="detail-type"><span>Available Time:</span>  {details.available_time}</div>
                      <div  className="detail-type"><span>Food Amount:</span>  {details.amount}</div>
                    </div>
                  </div>
                </Model>
              </div>
            </When>

            {/* <When condition={showDetails}>
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
            </When> */}

            <When condition={showUpdate}>
              <div className="cart-details-m">
                <Model title='cart update' close={toggleUpdate}>
                  <div className="recipient-updated cart-updated">
                    <form onSubmit={UpdteCartItem} value={details._id}className="update-form">
                      <label className="update-label">
                        <input type='hidden' className="update-input" name='_id' value={details._id} />
                      </label>
                      <label className="update-label" >Name :</label>
                        <input type='text' name='name' placeholder='type your name' className="update-input" defaultValue={updated.name} onChange={handelUpdateChange} required />
               
                      <div className="redio-div">
                        <label className="update-label-r">
                          <input type='radio' name='type' value='eastern food' className="update-input-r" onClick={handelUpdateChange} required />Eastern Food
                        </label>
                        <label className="update-label-r">
                          <input type='radio' name='type' value='fast food' className="update-input-r" onClick={handelUpdateChange} required />Fast Food
                        </label>
                        <label className="update-label-r">
                          <input type='radio' name='type' value='desserts' className="update-input-r" onClick={handelUpdateChange} required />Desserts
                        </label>
                      </div>
                      <label className="update-label" ><span>available_time</span> </label>
                        <input type='text' name='available_time' className="update-input" placeholder='type your available_time' defaultValue={updated.available_time} onChange={handelUpdateChange} required />
                     
                      <label className="update-label"> <span>amount</span>  </label>
                        <input type='number' name='amount' className="update-input" placeholder='type your amount' defaultValue={updated.amount} onChange={handelUpdateChange} />
                    
                      <button className="update-button">Submit</button>
                    </form>
                  </div>
                </Model>
              </div>
            </When>
          </Model>
        </When>
      </section>
    </>
  );
}

export default Recipients;