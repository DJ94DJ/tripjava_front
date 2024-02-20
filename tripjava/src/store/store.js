// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import regiondateReducer from './reducers/regiondateReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    region: regiondateReducer,
  },
});

export default store;
