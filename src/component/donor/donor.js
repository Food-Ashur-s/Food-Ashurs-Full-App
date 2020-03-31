/* eslint-disable no-unused-vars */
/* eslint-disable no-undefined */
import React, {useState, useEffect} from 'react';
import {Link , NavLink} from 'react-router-dom';
import Model from '../modal';
import {When} from '../if';
import cartPhoto from '../../assets/cart.gif';
import donatePhoto from '../../assets/donate-form.gif';

import './donor.scss';
import '../../../node_modules/aos/dist/aos.css';
import desserts0 from '../../assets/desserts-0.jpg';
import desserts1 from '../../assets/desserts-1.jpg';
import desserts2 from '../../assets/desserts-2.jpg';


import easternfood0 from '../../assets/eastern-food-0.jpg';
import easternfood1 from '../../assets/eastern-food-1.jpg';
import easternfood2 from '../../assets/eastern-food-2.jpg';


import fastfood0 from '../../assets/fast-food-0.jpg';
import fastfood1 from '../../assets/fast-food-1.jpg';
import fastfood2 from '../../assets/fast-food-2.jpg';
import fastfood3 from '../../assets/fast-food-3.jpg';
import Recipients from '../resipient/resipient';
import fastfood4 from '../../assets/fast-food-4.jpg';
import fastfood5 from '../../assets/fast-food-5.jpg';

import AOS from 'aos';

const easternfoodArray = [easternfood0, easternfood1, easternfood2];
const fastfoodArray = [fastfood0, fastfood1, fastfood2 ,fastfood4,fastfood5];
const dessertsArray = [desserts0, desserts1, desserts2];



const donorsAPI = `${process.env.REACT_APP_API}/api/v1/donor`;

function Donors (props){
  AOS.init();

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
      .catch( (e) => typeof errorHandler === 'function' ? errorHandler(e) : console.error(e));
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
    const _updateState  = results => {};
    callAPI(`${donorsAPI}/${id}`, 'DELETE', undefined, _updateState );
  };


  const handelUpdateChange = e => {
    setUpdate({...updated, [e.target.name]: e.target.value});
  };

  const UpdteItem = e =>{
    e.preventDefault();
    console.log(updated);
    setDonation([updated]);
    const updateHandeler  = newItem => {};
    callAPI(`${donorsAPI}/${updated._id}`, 'PUT', updated, updateHandeler );
    setShowUpdate(!showUpdate);

  };

  const getdonorList = () => {
    const _updateState = data =>
      setDonorList(data.results);
    callAPI( `${process.env.REACT_APP_API}/api/v1/recipient`, 'GET', undefined, _updateState );
  };
  useEffect(() => {
    getdonorList();
  }, [donorList]);

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
      <section className="block-donor">
        <div className="donation-div">
          <h3 data-aos="zoom-in-up" data-aos-duration="1000" className="donor-header">Donor Section</h3>
          <span className="space-span"></span>
          <p data-aos="fade-left" data-aos-duration="1000" className="donation-p">“Every man must decide whether he will walk in the light of creative altruism or in the darkness of destructive selfishness.”</p>
          <p data-aos="fade-right" data-aos-duration="1000" className="donation-p">“Love is not patronizing and charity isn't about pity, it is about love. Charity and love are the same -- with charity you give love, so don't just give money but reach out your hand instead.”</p>
          {/* <img src={cartPhoto} onClick={toggleCart}  height="100" width="200"/> */}
          <div className="donation-href-div">
            <div className="cart-div" data-aos="fade-right"
              data-aos-offset="100"
              data-aos-easing="ease-in-sine">
              {/* <header className="cart-count">{numberOfCart}</header> */}
              <i className="fa fa-cart-plus curt-item" aria-hidden="true" onClick={toggleCart} > <header className="cart-count">{numberOfCart}</header></i></div>
            {!showForm && (
              <button  data-aos="zoom-in-up" data-aos-duration="1000" onClick={toggleForm} className="donation-button"> Let's Donate !</button>)}
          </div>
          {showForm && (
            <Model title='donor-form' close={toggleForm}>
              <div className="addMeal-div">
                <div className="addMeal-form" >
                  <form onSubmit={addItem} className="add-form">
                    <label className="form-lable-">meal name:</label>
                    <input type='text' name='name' placeholder='type your name' className="form-input-" onChange={handelInputChange} required />
                    <div className="form-lable-r">
                      <label>
                        <input type='radio' name='type' value='eastern food'   onClick={handelInputChange} required />Eastern Food
                      </label>
                      <label>
                        <input type='radio' name='type' value='fast food'   onClick={handelInputChange} required />Fast Food
                      </label>
                      <label>
                        <input type='radio' name='type' value='desserts' onClick={handelInputChange} required />Desserts
                      </label>
                    </div>

                    <label className="form-lable-">Amount:</label>
                    <input type='number' name='amount'  className="form-input-" placeholder='type your amount' onChange={handelInputChange} />
                    <label className="form-lable-"> Avalible time:</label>
                    <input type='time' name='available_time'  className="form-input- time" placeholder='type your available_time' onChange={handelInputChange} required />
                    <button className="form-button-">Submit</button>
                  </form>
                </div>
              </div>
            </Model>
          )}
        </div>

        {donation.map((item,i)=>{
          let src = item.type === 'eastern food' ? easternfoodArray[num] : item.type === 'fast food' ? fastfoodArray[num] : dessertsArray[num];
          return <div key={i} className="donor-line-section div-aos" data-aos="zoom-in-up" data-aos-duration="2000" >
            <div className="donor-item section-item">
              <img src={src} className="section-donor-item-img" height="330px" width="300px" />
              <div className="section-info">
                <div className="section-donor-name">{item.name}</div>
                <div className="section-donor-type">{item.type}</div>
                <div className="section-donor-time">{item.available_time}</div>
                <div className="section-donor-amount">{item.amount}</div>
              </div>
              <div className="section-button">
                <button onClick={()=> toggleUpdate(item)} className="donor-item-button-section"> <i className="	fa fa-address-card-o info"></i>Update</button>
                <button onClick={()=> deleteItem(item._id)} className="donor-item-button-section"><i className="fa fa-close info"></i> DELETE</button>
              </div>
            </div>
          </div>;
        })}

      </section>
      <h4 data-aos="zoom-in-up" data-aos-duration="1500" className="recipient-header"> Recipients Request</h4>
      <section className="block-recipient">
        <div className="recipient-list">
          {donorList.map((donor, idx) =>{
            let src = donor.requestType === 'eastern food' ? easternfoodArray[num] : donor.requestType === 'fast food' ? fastfoodArray[num] : dessertsArray[num];
            return <div key={idx} className="donor-line div-aos" data-aos="zoom-in-up" data-aos-duration="2000">
              <div className="donor-item">
                <img src={src} className="donor-item-img" height="330" width="300" />
                <div className="donor-item-name">
                  {donor.name}
                </div>
              </div>
              <div className="styles-div">
                <div className="donor-item-div1" data-aos="fade-right"
                  data-aos-duration="1500" ></div>
                <div className="donor-item-div2"data-aos="fade-left"
                  data-aos-duration="1700"></div>
              </div>
              <div className="div-buttons">
                <button onClick={()=> toggleDetails(donor)} className="donor-item-button"> <i className="	fa fa-address-card-o info"></i>More Detail</button>
                <button onClick={()=> addCart(donor)} className="donor-item-button"> <i className="fa fa-cart-plus cart" ></i>Add To Cart</button>
              </div>
            </div>;
          })}
        </div>
        <When condition={showDetails}>
          <Model title='Recipient details' close={toggleDetails}>
            <div className="recipient-details">
              <div className="item">
            Description: {details.description}
              </div>
              <div className="detail-info">
                <div className="detail-name"><span>Name:</span> <p>{details.name}</p></div>
                <div className="detail-type"><span>Request Type:</span> <p>{details.requestType}</p> </div>
                <div className="detail-identity"><span>Identity:</span> <p>{details.identity}</p></div>
                <div ><i className="fa fa-phone"></i><p>{details.contactNumber}</p></div>
              </div>
            </div>
          </Model>
        </When>
        <When condition={showUpdate}>
          <Model title='Recipient update' close={toggleUpdate}>
            <div className="recipient-updated">
              <form onSubmit={UpdteItem} value={updated} className="update-form">
                <label className="update-label">
                  <input type='hidden' v name='_id' value={details._id} className="update-input" />
                </label>
                <label className="update-label"> <span> Name:</span>
                  <input type='text' name='name' placeholder='type your name' className="update-input" defaultValue={updated.name} onChange={handelUpdateChange} required />
                </label>
                <div className="redio-div">
                  <label className="update-label-r">
                    <input type='radio' name='type' value='eastern food' className="update-input-r" onClick={handelUpdateChange} required />Eastern Food
                  </label>
                  <label className="update-label-r">
                    <input type='radio' name='type' value='fast food' className="update-input-r" onClick={handelUpdateChange} required />Fast Food
                  </label>
                  <label className="update-label-r">
                    <input type='radio' name='type' value='desserts' className="update-input-r" onClick={handelUpdateChange} required /> Desserts
                  </label>
                </div>
                <label className="update-label"> <span> Available time:</span>
                  <input type='text' name='available_time' placeholder='type your available_time' className="update-input" defaultValue={updated.available_time} onChange={handelUpdateChange} required />
                </label>
                <label className="update-label"><span> Amount: </span>
                  <input type='number' name='amount' placeholder='type your amount' className="update-input" defaultValue={updated.amount} onChange={handelUpdateChange} />
                </label>
                <button className="update-button" >Submit</button>
              </form>
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
                    <button onClick={()=> toggleCartDetails(item)} className="update-button-cart">More Detail</button>
                    <button onClick={()=> toggleCartUpdate(item)} className="update-button-cart">Update</button>
                    <button onClick={()=> deleteCartItem(item._id)} className="update-button-cart">DELETE</button>
                  </div>
                </div>;
              })
            }
          </Model>
        </When>
      </section>
    </>
  );
}
export default Donors;