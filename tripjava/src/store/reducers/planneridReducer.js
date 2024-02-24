// reducers/planneridReducer.js
import { SET_PLANNER_ID } from "../actions/plannerid";

const initialState = {
  plannerId: null,
};

const plannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANNER_ID: // 문자열 대신 액션 타입 상수 사용
      return {
        ...state,
        plannerId: action.payload,
      };
    default:
      return state;
  }
};

export default plannerReducer;
