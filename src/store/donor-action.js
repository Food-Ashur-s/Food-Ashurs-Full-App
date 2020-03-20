// BackEnd API 
let api = 'https://food--ashurs.herokuapp.com/api/v1/donor';

/*************************************** GET Method ******************************************************/
export const getRemoteData = () => dispatch => {
    return fetch(api)
        .then(results => results.json())
        .then(records => {
            dispatch(getAction(records));
        })
}

export const getAction = payload => {
    return {
        type: 'GET',
        payload: payload
    }
}

/*************************************** POST Method ******************************************************/
// export const postRemoteData = (data) => dispatch => {
//     let url = `${api}`;
//     let results = await fetch(url, {
//         method: 'post',
//         body: JSON.stringify(data)
//     });
//     dispatch(getRemoteData);
//     let record = await results.json();
//     // dispatch(getAction(record));
// }

// export const postAction = payload => {
//     return {
//         type: 'POST',
//         payload: payload
//     }
// }
/*************************************** PUT Method ******************************************************/
export const putRemoteData = (id, data) => async dispatch => {
    let url = `${api}/${id}`;
    let results = await fetch(url, {
        method: 'put',
        body: JSON.stringify(data)
    });
    dispatch(getRemoteData);
    let record = await results.json();
    dispatch(getAction(record));
}

/*************************************** Delete Method ******************************************************/
// export const deleteRemoteData = (id, data) => async dispatch => {
//     let url = `${api}/${id}`;
//     let results = await fetch(url, {
//         method: 'delete',
//         body: JSON.stringify(data)
//     });
//     dispatch(getRemoteData);
//     let record = await results.json();
//     dispatch(getAction(record));
// }