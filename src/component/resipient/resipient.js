/* eslint-disable no-undefined */
import React, {useState, useEffect} from 'react';
import Model from '../modal';
import {When} from '../if';

const recipientsAPI = 'https://food--ashurs.herokuapp.com/api/v1/recipient';

function Recipients (props){

  const [recipientList, setRecipientList] = useState([]);
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

    const postHandeler  = newItem => setRecipientList([...recipientList, newItem]);
    callAPI(recipientsAPI, 'POST', item, postHandeler );
  };

  const deleteItem = id =>{
    const deleteHandeler  = results => setRecipientList(recipientList.filter(recipient=> recipient._id !== id));
    callAPI(`${recipientsAPI}/${id}`, 'DELETE', undefined, deleteHandeler );
  };

  const UpdteItem = updatedItem =>{
    const updateHandeler  = newItem =>
      setRecipientList(recipientList.map(recipient => recipient._id === newItem._id ? newItem : recipient));
    callAPI(`${recipientsAPI}/${updatedItem._id}`, 'PUT', updatedItem, updateHandeler );
  };
  const getRecipientList = () => {
    const getHandeler = data => setRecipientList(data.results);
    callAPI( recipientsAPI, 'GET', undefined, getHandeler );
  };
  useEffect(() => {
    getRecipientList();
  }, [recipientList]);

  const toggleDetails = id => {
    let details = recipientList.filter( item => item._id === id )[0] || {};
    setDetails(details);
    setShowDetails(!showDetails);
  };

  return (
    <>
      <h1>Recipients</h1>

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
      </form>

      <div>
        {recipientList.map((recipient, idx) =>{
          console.log(recipient);
          return <ul key={idx}>
            <li>
              {recipient.name}
            </li>
            <button onClick={()=> toggleDetails(recipient._id)}>More Detail</button>
            <button onClick={()=> deleteItem(recipient._id)}>DELETE</button>
          </ul>;
        })}
      </div>
      <When condition={showDetails}>
        <Model title='Recipient details' close={toggleDetails}>
          <div className="recipient-details">
            <header>
              <li>Name: {details.name}   </li>
              <li>Request Type: {item.requestType}   </li>
              <li>Identity: {details.identity}   </li>
              <li>Contact Number: {details.contactNumber}</li>
            </header>
            <div className="item">
            description: {details.description}
            </div>
          </div>
        </Model>
      </When>
    </>
  );
}

export default Recipients;
