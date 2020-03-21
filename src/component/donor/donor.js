/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React , {useEffect} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/donor-action.js';

const Donor = (props) => {
  const fetchData = (e) => {
    e && e.preventDefault();
    props.get();
  };


  const postData = (e, donor) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let name = formData.post('name');
    let foodType = formData.post('foodType');
    let time = formData.post('time');
    let amount = formData.post('amount');
    props.post({name , foodType , time , amount});
  };

  const updateData = (e, donor) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let name = formData.get('name');
    let foodTye = formData.get('foodType');
    let time = formData.get('time');
    let amount = formData.get('amount');
    let id = formData.get('id');
    props.put(id , {name, foodTye , time , amount});
  };

  useEffect(() => {
    fetchData();
    console.log('__API_RESULTS__:', props.donorData.results);
  }, []);


  useEffect(() => {
    console.log('__API_RESULTS__:', props.donorData.results);
  }, [props.donorData]);

  return (
    <div>
      <h3> Donors </h3>

      <form onSubmit={() => postData()}>
        <input name='name' placeholder="enter the name"/>
        <label>Fast food
          <input name='foodType' type="radio"/>
        </label>
        <label>Eastern Food
          <input name='foodType' type="radio"/>
        </label>
        <label>Desserts
          <input name='foodType' type="radio"/>
        </label>
        <input name="time" type="time" />
        <input name='amount' type="number"/>
        <button> Add </button>
      </form>
      {
        props.donorData.results.map((donor , index) => (
          <form onSubmit={() => updateData((donor ,index))}>
            <input name='name' placeholder="enter the name" defaultValue={donor.name}/>
            <label>Fast food
              <input name='foodType' type="radio"/>
            </label>
            <label>Eastern Food
              <input name='foodType' type="radio"/>
            </label>
            <label>Desserts
              <input name='foodType' type="radio"/>
            </label>
            <input name="time" type="time" defaultValue={donor.time}/>
            <input name='amount' type="number" defaultValue={donor.amount}/>
            <input type="hidden" name="id" defaultValue={donor._id}/>
            <button> Update </button>
          </form>
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  donorData : state.donorData,
});

const mapDispatchToProps = (dispatch , getState) => ({
  get: () => dispatch(actions.getRemoteData()),
  post : (donor) => dispatch(actions.postRemoteData(donor)),
  put: (donor ,id) => dispatch(actions.putRemoteData(donor , id)),
});

export default connect(mapStateToProps , mapDispatchToProps)(Donor);