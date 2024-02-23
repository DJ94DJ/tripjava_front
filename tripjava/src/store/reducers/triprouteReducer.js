import { ADD_ROUTE, RESET_ROUTE } from '../actions/triproute';

const initialState = {
  routes: [], // 마커 정보를 저장할 배열
};

const triprouteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROUTE:
      return {
        ...state,
        routes: [...state.routes, action.payload],
      };
    case RESET_ROUTE:
      return {
        ...state,
        routes: [],
      };
    default:
      return state;
  }
};

export default triprouteReducer;
