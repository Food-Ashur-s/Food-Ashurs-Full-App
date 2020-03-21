/* eslint-disable no-undefined */
import React, {useState, useEffect} from 'react';
import Model from '../modal';
import {When} from '../if';

const donorsAPI = 'https://food--ashurs.herokuapp.com/api/v1/donor';

function Donors (props){

  const [donorList, setDonorList] = useState([]);
  const [item, setItem] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});

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
  };

  const deleteItem = id =>{
    const _updateState  = results => setDonorList(donorList.filter(donor=> donor._id !== id));
    callAPI(`${donorsAPI}/${id}`, 'DELETE', undefined, _updateState );
  };

  const UpdteItem = updatedItem =>{
    const _updateData  = newItem =>
      setDonorList(donorList.map(donor => donor._id === newItem._id ? newItem : donor));
    callAPI(`${donorsAPI}/${updatedItem._id}`, 'PUT', updatedItem, _updateData );
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

  return (
    <>
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

      <div>
        {donorList.map((donor, idx) =>{
          return <ul key={idx}>
            <li>
              {donor.name}
            </li>
            <button onClick={()=> toggleDetails(donor._id)}>More Detail</button>
            <button onClick={()=> deleteItem(donor._id)}>DELETE</button>
          </ul>;
        })}
      </div>
      <When condition={showDetails}>
        <Model title='Recipient details' close={toggleDetails}>
          <div className="recipient-details">
            <header>
              <li>Name: {details.name}   </li>
              <li>Donation Type: {item.type}   </li>
              <li>Available Time: {details.available_time}   </li>
            </header>
            <div className="item">
            Food Amount: {details.amount}
            </div>
          </div>
        </Model>
      </When>
    </>
  );
}

export default Donors;
