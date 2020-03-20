import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/donor-action.js';

const DonorMethod = (props) => {
  const fetchData = (e) => {
    e && e.preventDefault();
    props.get();
  }

  const postData = (e, donor) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let name = formData.post('name');
    let type = formData.post('typeOfFood');
    let available_time = formData.post('atTime');
    let foodAmount = formData.post('foodamount');
    props.post({name , type , available_time , foodAmount});
  };


  const updateTeam = (e, team) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let name = formData.get('name');
    let id = formData.get('id');
    let type = formData.get('typeOfFood');
    let available_time = formData.get('atTime');
    let foodAmount = formData.get('foodamount');

    props.put(id, { name , type,available_time,foodAmount })
  }

  useEffect(() => {
    fetchData();
    console.log('__API_RESULTS__:', props.data.results);
  }, []);

  useEffect(() => {
    // fetchData();
    console.log('__API_RESULTS__:', props.data.results);
  }, [props.data]);

  return (
    <section>
         <form onSubmit={() => postData()}>
          <input name="name"  placeholder="Enter A Name "/>
          <input type="hidden" name="id"  />
          <label> 
          <input name="typeOfFood" type="radio" />
          Fast Food </label>
          <label>  
          <input name="typeOfFood" type="radio" />
          Deserts </label>
          <label> 
          <input name="typeOfFood" type="radio" />
          Eastren Food </label>
          <input name="atTime"  placeholder="Enter Available Time "/>
          <input name="foodamount"  placeholder="Enter Food Amount(optional) "/>

          <button>Add New Donor</button>
        </form>
      <button onClick={fetchData}>Get All Donors</button>
    
      {props.data.results.map((record, idx) => (
        <form key={idx} onSubmit={(e) => updateTeam(e, record)}>
          <input name="name" defaultValue={record.name} placeholder="Enter A Name "/>
          <input type="hidden" name="id" defaultValue={record._id} />
          <input name="typeOfFood" type="radio" />
          <input name="typeOfFood" type="radio" />
          <input name="typeOfFood" type="radio" />
          <input name="atTime" defaultValue={record.time} placeholder="Enter Available Time "/>
          <input name="foodamount" defaultValue={record.foodAmount} placeholder="Enter Food Amount(optional) "/>
        </form>
      ))}

    </section>
  )
}

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = (dispatch, getState) => ({
  get: () => dispatch(actions.getRemoteData()),
  put: (id, data) => dispatch(actions.putRemoteData(id, data))
//   post: ,
//   delete
});

export default connect(mapStateToProps, mapDispatchToProps)(DonorMethod);
// export default DonorMethod;