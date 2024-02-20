// store.js
import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/auth';
import regionReducer from './reducers/regionReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  region: regionReducer,
});

const store = createStore(rootReducer);

export default store;
