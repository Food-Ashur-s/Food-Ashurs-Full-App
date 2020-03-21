/* eslint-disable no-undefined */
import React, {useState, useEffect} from 'react';


const recipientsAPI = 'https://food--ashurs.herokuapp.com/api/v1/recipient';

function Recipients (props){

  const [recipientList, setRecipientList] = useState([]);
  const [item, setItem] = useState({});
  //const [showDetails, setShowDetails] = useState(false);
  //const [details, setDetails] = useState({});

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
      .then(data => typeof handler === 'function')
      .catch(e => typeof errorHandler === 'function');
  };

  const addItem = e => {
    e.preventDefault();
    e.target.reset();

    const _updateState  = newItem => setRecipientList([...recipientList, newItem]);
    callAPI(recipientsAPI, 'POST', item, _updateState );
  };

  const deleteItem = id =>{
    const _updateState  = results => setRecipientList(recipientList.filter(recipient=> recipient._id !== id));
    callAPI(`${recipientsAPI}/${id}`, 'DELETE', undefined, _updateState );
  };

  const UpdteItem = updatedItem =>{
    const _updateData  = newItem =>
      setRecipientList(recipientList.map(recipient => recipient._id === newItem._id ? newItem : recipient));
    callAPI(`${recipientsAPI}/${updatedItem._id}`, 'PUT', updatedItem, _updateData );
  };
  const getRecipientList = () => {
    const _updateState = data =>
      setRecipientList(data.results) 
    callAPI( `${recipientsAPI}/5e74de83cb1ca900179978e5`, 'GET', undefined, _updateState );
  };
  useEffect(() => {
    getRecipientList();
  },getRecipientList());


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
        {console.log(recipientList)}
        {recipientList.map((recipient, idx) =>{
          console.log(recipient);
          return <ul key={idx}>
            <li>
              {recipient.name}
            </li>
            <button onClick={()=> deleteItem(recipient._id)}>DELETE</button>
          </ul>;
        })}
      </div>

    </>
  );
}

export default Recipients;
