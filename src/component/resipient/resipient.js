/* eslint-disable no-undefined */
import React, {useState, useEffect} from 'react';


const recipientsAPI = 'https://food--ashurs.herokuapp.com/api/v1/recipient';

function Recipients (props){

  const [recipientList, setRecipientList] = useState([]);
  const [item, setItem] = useState({});

  const handelInputChange = e => {
    setItem({...item, [e.target.name]: e.target.value});
  };

  const callAPI = (url, method = 'get', body, handler, errorHandler) => {
    return fetch(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
      .then( response => response.json())
      .then(data => typeof handler === 'function')
      .catch(e => typeof errorHandler === 'function');
  };

  const addItem = e => {
    e.preventDefault();
    e.target.reset();

    const _updateData = newItem => setRecipientList([...recipientList, newItem]);
    callAPI(recipientsAPI, 'POST', item, _updateData);
  };

  const deleteItem = id =>{
    const _updateData = results => setRecipientList(recipientList.filter(recipient=> recipient._id !== id));
    callAPI(`${recipientsAPI}/${id}`, 'DELETE', undefined, _updateData);
  };

  const saveItem = updatedItem =>{
    const _updateData = newItem =>
      setRecipientList(recipientList.map(recipient => recipient._id === newItem._id ? newItem : recipient));
    callAPI(`${recipientsAPI}/${updatedItem._id}`, 'PUT', updatedItem, _updateData);
  };

  const getRecipientList = () => {
    console.log('hi');
    const _updateData = data => setRecipientList(data.results);
    callAPI(recipientsAPI, 'GET', undefined, _updateData);
  };
  useEffect(()=>{
    getRecipientList();
  });

  return (
    <>
      <h1>Food Ashurs</h1>

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
              {recipient.requestType}
              {recipient.identity}
              {recipient.contactNumber}
              {recipient.description}
            </li>
            <button onClick={()=> deleteItem(recipient._id)}>DELETE</button>
          </ul>;
        })}
      </div>

    </>
  );
}

export default Recipients;
