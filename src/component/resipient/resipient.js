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
  const [showUpdate, setShowUpdate] = useState(false);
  const [updated, setUpdate] = useState({});

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

  const handelUpdateChange = e => {
    setUpdate({...updated, [e.target.name]: e.target.value});
  };

  const UpdteItem = e =>{
    e.preventDefault();
    console.log(updated);

    const updateHandeler  = newItem =>
      setRecipientList(recipientList.map(recipient => recipient._id === newItem._id ? newItem : recipient));
    callAPI(`${recipientsAPI}/${updated._id}`, 'PUT', updated, updateHandeler );
    setShowUpdate(!showUpdate);

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

  const toggleUpdate = id => {
    let updated = recipientList.filter( item => item._id === id )[0] || {};
    setUpdate(updated);
    setShowUpdate(!showUpdate);
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
          return <ul key={idx}>
            <li>
              {recipient.name}
            </li>
            <button onClick={()=> toggleDetails(recipient._id)}>More Detail</button>
            <button onClick={()=> toggleUpdate(recipient._id)}>Update</button>
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
      <When condition={showUpdate}>
        <Model title='Recipient update' close={toggleUpdate}>
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
        </Model>
      </When>
    </>
  );
}

export default Recipients;
