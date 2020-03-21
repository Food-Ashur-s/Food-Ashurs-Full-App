

let initialState = { results: []};

export default (state = initialState , action) => {
  const { type , payload} = action;

  switch(type) {
  case 'GET':{
    return payload;
  }
  case 'POST':{
    // let results = state.results.map(donor => {
    //     return { name : donor.name , foodType: donor.foodType , time: donor.time , amount: donor.amount}
    // })
    let results = state.results.push(payload);
    return results;
  }
  default:
    return state;
  }
};