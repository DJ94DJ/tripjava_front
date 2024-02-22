// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import triprouteReducer from './reducers/triprouteReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    region: triprouteReducer,
  },
});

export default store;
