

import { createStore , combineReducers , applyMiddleware} from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'; //middleWare
import reducer from '../store/donor-reducers.js';

let reducers = combineReducers({ donorData : reducer});

const store = () => {
  return createStore(reducers , composeWithDevTools(applyMiddleware(thunk)));
};

export default store();
