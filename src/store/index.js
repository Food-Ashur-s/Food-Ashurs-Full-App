import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from './middleware/thunk.js';

import reducer from './donor-reducers.js';

let reducers = combineReducers({
  data: reducer
})

const store = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
}

export default store();