// store.js
import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/auth';
import regiondateReducer from './reducers/regiondateReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  region: regiondateReducer,
});

const store = createStore(rootReducer);

export default store;
