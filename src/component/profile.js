import React, {useState, useEffect} from 'react';
import Model from './modal';
import {When} from './if';

function Profile (props){
//   console.log(props);

  //   const [favourite, setFavourite] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [updated, setUpdate] = useState({});


  const handelUpdateChange = e => {
    setUpdate({...updated, [e.target.name]: e.target.value});
  };

  const toggleDetails = id => {
    let details = props.cartList.filter( item => item._id === id )[0] || {};
    console.log(details);
    setDetails(details);
    setShowDetails(!showDetails);
  };

  const toggleUpdate = id => {
    let updated = props.cartList.filter( item => item._id === id )[0] || {};
    setUpdate(updated);
    setShowUpdate(!showUpdate);
  };

  const deleteItem = id => {
    let newCartList = props.cartList.filter( item => item._id !== id );
    props.setCartList(newCartList);
  };

  const UpdteItem = e =>{
    e.preventDefault();
    props.setCartList(props.cartList.map(item => item._id === updated._id ? updated : item));
    setShowUpdate(!showUpdate);
  };
  const IfDonor = props => {
    return props.donorCart   ? props.children  : null;
  };
  const IfRecipient = props => {
    return props.recipientCart   ? props.children  : null;
  };


  return (
    <>
      {
        props.cartList.map((item, i)=>{
          return <ul key={i}>
            <li>{item.name}</li>
            <button onClick={()=> toggleDetails(item._id)}>More Detail</button>
            <button onClick={()=> toggleUpdate(item._id)}>Update</button>
            <button onClick={()=> deleteItem(item._id)}>DELETE</button>
          </ul>;
        })
      }

      {/* </IfDonor> */}
      {/* <IfDonor props> */}
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
            <form onSubmit={UpdteItem} value={details._id}>
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
      {/* </IfDonor> */}
      {/* <IfRecipient props>
        <When condition={showDetails}>
          <Model title='Recipient details' close={toggleDetails}>
            <div className="recipient-details">
              <header>
                <li>Name: {details.name}   </li>
                <li>Request Type: {details.requestType}   </li>
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
      </IfRecipient> */}

    </>
  );
}

export default Profile;