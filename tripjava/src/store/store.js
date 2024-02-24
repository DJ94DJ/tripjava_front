// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import triprouteReducer from './reducers/triprouteReducer';
import plannerReducer from './reducers/plannerReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    triproute: triprouteReducer,
    planner: plannerReducer
  }
});

export default store;
