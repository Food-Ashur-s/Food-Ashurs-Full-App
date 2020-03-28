

let api = process.env.DONOR_API;

export const getRemoteData = () => dispatch => {
  return fetch(api)
    .then(results => results.json())
    .then(records => {
      dispatch(getAction(records));
    });
};



export const postRemoteData = (data) => async dispatch => {
  let url = `${api}`;
  let results = await fetch(url , {
    method : 'post',
    body: JSON.stringify(data),
  });
  // dispatch()
  let records = await results.json();
  dispatch(postAction(records));

};

// ---- Update ------ //
export const putRemoteData = (data , id) => async dispatch => {
  let url = `${api}/${id}`;
  let results = await fetch(url , {
    method: 'put',
    body: JSON.stringify(data),
  });
  dispatch(getRemoteData);
  let records = await results.json();
  dispatch(getAction(records));
};


export const postAction = payload => {
  return {
    type: 'POST',
    payload: payload,
  };
};

// -------- READ --------//
export const getAction = payload => {
  return {
    type: 'GET',
    payload : payload,
  };
};