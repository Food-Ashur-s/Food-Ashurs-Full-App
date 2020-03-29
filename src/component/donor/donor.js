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



const donorsAPI = 'https://food--ashurs.herokuapp.com/api/v1/donor';

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

  // const deleteItem = id =>{
  //   const _updateState  = results => setDonorList(donorList.filter(donor=> donor._id !== id));
  //   callAPI(`${donorsAPI}/${id}`, 'DELETE', undefined, _updateState );
  // };
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

      <section className="block-donor">
        {/* <div className="fixx"></div> */}
        {/* <h1>Donors</h1> */}
        <div className="donation-div">
          <h3 data-aos="zoom-in-up" data-aos-duration="1000" className="donor-header">Donor Section</h3>
          <span className="space-span"></span>
          <div className="cart-div"><i data-aos="fade-right"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"className="fa fa-cart-plus curt-item" aria-hidden="true" onClick={toggleCart} ></i></div>
          <p data-aos="fade-left" data-aos-duration="1000" className="donation-p">“Every man must decide whether he will walk in the light of creative altruism or in the darkness of destructive selfishness.”</p>
          <p data-aos="fade-right" data-aos-duration="1000" className="donation-p">“Love is not patronizing and charity isn't about pity, it is about love. Charity and love are the same -- with charity you give love, so don't just give money but reach out your hand instead.”</p>
          {/* <img src={cartPhoto} onClick={toggleCart}  height="100" width="200"/> */}
          <div className="donation-href-div">
            {!showForm && (<button  data-aos="zoom-in-up" data-aos-duration="1000" onClick={toggleForm} className="donation-button"> Make donation !</button>)}
          </div>
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
        </div>

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

      </section>
      <h4 data-aos="zoom-in-up" data-aos-duration="1500" className="recipient-header"> Recipient Request</h4>
      <section className="block-recipient">
        <div className="recipient-list">
          {donorList.map((donor, idx) =>{
            let src = donor.type === 'eastern food' ? easternfoodArray[num] : donor.type === 'fast food' ? fastfoodArray[num] : dessertsArray[num];
            return <div key={idx} className="donor-line div-aos" data-aos="zoom-in-up" data-aos-duration="2000">
              <div className="donor-item">
                <img src={src}className="donor-item-img" height="330" width="300" />
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
                {/* <button onClick={()=> toggleUpdate(donor._id)}>Update</button>
                <button onClick={()=> deleteItem(donor._id)}>DELETE</button>  */}
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
                <div className="detail-name"><span> Name:</span> <p>{details.name}</p></div>
                <div className="detail-type"><span> Request Type:</span> <p>{details.requestType}</p> </div>
                <div className="detail-identity"><span>  Identity:</span> <p>{details.identity}</p></div>
                <div > <i className="fa fa-phone"></i> <p>{details.contactNumber}</p></div>
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
                <label className="update-label"> <span> Name :</span>
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
                <label className="update-label"> <span> Available time :</span>
                  <input type='text' name='available_time' placeholder='type your available_time' className="update-input" defaultValue={updated.available_time} onChange={handelUpdateChange} required />
                </label>
                <label className="update-label"><span> Amount : </span>
                  <input type='number' name='amount' placeholder='type your amount' className="update-input" defaultValue={updated.amount} onChange={handelUpdateChange} />
                </label>
                <button className="update-button" >Submit</button>
              </form>
            </div>
          </Model>
        </When>
      </section>
    </>
  );
}

export default Donors;



{/* <div className="donors-list">
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
          // Math.floor(Math.random() * easternfoodArray.length);
          let src = donor.type === 'eastern food' ? easternfoodArray[num] : donor.type === 'fast food' ? fastfoodArray[num] : dessertsArray[num];

          return(
            <>
              <div key={idx} className="donor-line div-aos" data-aos="zoom-in-up" data-aos-duration="2000">
                {/* <div className="donor-item"> */}
{/* <img src={src} className="donor-item-img" height="330" width="300" />
                <div className="donor-item-name">
                  {donor.name}
                </div>
                <div className="styles-div">
                  <div className="donor-item-div1" data-aos="fade-right"
                    data-aos-duration="1500" ></div>
                  <div className="donor-item-div2"data-aos="fade-left" data-aos-duration="1700"
                  ></div>
                </div>
                <div className="div-buttons">
                  <button onClick={()=> toggleDetails(donor._id)} className="donor-item-button more">More Detail</button>
                  <button onClick={()=> toggleUpdate(donor._id)} className="donor-item-button">Update</button>
                  <button onClick={()=> deleteItem(donor._id)} className="donor-item-button">DELETE</button>
                </div>
              </div>
            </>); */}
{/* })}
      </div> */}
{/* <When condition={showDetails}>
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
        <Model title='Recipient update' close={toggleUpdate}>
          <div className="recipient-updated">
            <form onSubmit={UpdteItem} value={updated}>
              <input type='hidden' name='_id' value={details._id} />
              <input type='text' name='name' placeholder='type your name' defaultValue={updated.name} onChange={handelUpdateCartChange} required />
              <br/>
              <input type='text' name='name' placeholder='type your name' defaultValue={updated.name} onChange={handelUpdateChange} required />
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
              <input type='text' name='available_time' placeholder='type your available_time' defaultValue={updated.available_time} onChange={handelUpdateChange} required />
              <input type='number' name='amount' placeholder='type your amount' defaultValue={updated.amount} onChange={handelUpdateChange} />
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
      </When> */}
