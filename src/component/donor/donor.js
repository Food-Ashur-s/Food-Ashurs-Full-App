/* eslint-disable no-unused-vars */
/* eslint-disable no-undefined */
import React, {useState, useEffect} from 'react';
import Model from '../modal';
import {When} from '../if';
import './donor.scss';
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



const donorsAPI = 'https://food--ashurs.herokuapp.com/api/v1/donor';

function Donors (props){

  const [donorList, setDonorList] = useState([]);
  const [item, setItem] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [updated, setUpdate] = useState({});
  const [ num, setNum] = useState(0);

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

    const _updateState  = newItem => setDonorList([...donorList, newItem]);
    callAPI(donorsAPI, 'POST', item, _updateState );
    setNum(Math.floor(Math.random() * 4));
  };

  const deleteItem = id =>{
    const _updateState  = results => setDonorList(donorList.filter(donor=> donor._id !== id));
    callAPI(`${donorsAPI}/${id}`, 'DELETE', undefined, _updateState );
  };


  const handelUpdateChange = e => {
    setUpdate({...updated, [e.target.name]: e.target.value});
  };

  const UpdteItem = e =>{
    e.preventDefault();
    console.log(updated);

    const updateHandeler  = newItem =>
      setDonorList(donorList.map(donor => donor._id === newItem._id ? newItem : donor));
    callAPI(`${donorsAPI}/${updated._id}`, 'PUT', updated, updateHandeler );
    setShowUpdate(!showUpdate);

  };
  const getdonorList = () => {
    const _updateState = data =>
      setDonorList(data.results);
    callAPI( donorsAPI, 'GET', undefined, _updateState );
  };
  useEffect(() => {
    getdonorList();
  }, [donorList]);

  const toggleDetails = id => {
    let details = donorList.filter( item => item._id === id )[0] || {};
    setDetails(details);
    setShowDetails(!showDetails);
  };

  const toggleUpdate = id => {
    let updated = donorList.filter( item => item._id === id )[0] || {};
    setUpdate(updated);
    setShowUpdate(!showUpdate);
  };

  return (
    <>
      <div className="fixx"></div>
      <h1>Donors</h1>

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

      <div className="donors-list">
        {donorList.map((donor, idx) =>{
          let src = donor.type === 'eastern food' ? easternfoodArray[num] : donor.type === 'fast food' ? fastfoodArray[num] : dessertsArray[num];

          return(
            <>
              <div key={idx} className="donor-line">
                {/* <div className="donor-item"> */}
                <img src={src} className="donor-item-img" height="330" width="300" />
                <div className="donor-item-name">
                  {donor.name}
                </div>
                <div className="styles-div">
                  <div className="donor-item-div1"></div>
                  <div className="donor-item-div2"></div>
                </div>
                <div className="div-buttons">
                  {/* <div className="s"></div> */}
                  <button onClick={()=> toggleDetails(donor._id)} className="donor-item-button more">More Detail</button>
                  <button onClick={()=> toggleUpdate(donor._id)} className="donor-item-button">Update</button>
                  <button onClick={()=> deleteItem(donor._id)} className="donor-item-button">DELETE</button>
                </div>

                {/* </div> */}
              </div>
            </>);
        })}
      </div>
      <When condition={showDetails}>
        <Model title='Recipient details' close={toggleDetails}>
          <div className="recipient-details">
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
        <Model title='Recipient update' close={toggleUpdate}>
          <div className="recipient-updated">
            <form onSubmit={UpdteItem} value={updated}>
              <input type='hidden' name='_id' value={details._id} />
              <input type='text' name='name' placeholder='type your name' defaultValue={updated.name} onChange={handelUpdateChange} required />
              <label> Eastern Food
                <input type='radio' name='type' value='eastern food' onClick={handelUpdateChange} required />
              </label>
              <label> Fast Food
                <input type='radio' name='type' value='fast food' onClick={handelUpdateChange} required />
              </label>
              <label> Desserts
                <input type='radio' name='type' value='desserts' onClick={handelUpdateChange} required />
              </label>
              <input type='text' name='available_time' placeholder='type your available_time' defaultValue={updated.available_time} onChange={handelUpdateChange} required />
              <input type='number' name='amount' placeholder='type your amount' defaultValue={updated.amount} onChange={handelUpdateChange} />
              <button >Submit</button>
            </form>
          </div>
        </Model>
      </When>
    </>
  );
}

export default Donors;
