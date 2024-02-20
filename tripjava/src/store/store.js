// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import maininfoReducer from './reducers/maininfoReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    region: maininfoReducer,
  },
});

export default store;
