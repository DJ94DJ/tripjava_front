// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import triprouteReducer from "./reducers/triprouteReducer";
import planneridReducer from "./reducers/planneridReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    triproute: triprouteReducer,

    planner: planneridReducer,
  },

});

export default store;
