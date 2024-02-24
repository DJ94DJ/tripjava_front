import { ADD_ROUTE, RESET_ROUTE, REMOVE_ROUTE } from '../actions/triproute';

const initialState = {
  routes: [], // 마커 정보를 저장할 배열
  selectedDestinations: [],
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
    case REMOVE_ROUTE:
      return {
        ...state,
        routes: state.routes.filter((route) => route.id !== action.payload),
      };
    case 'ADD_SELECTED_DESTINATION':
      return {
        ...state,
        selectedDestinations: [...state.selectedDestinations, action.payload],
      };
    case 'REMOVE_SELECTED_DESTINATION':
      return {
        ...state,
        selectedDestinations: state.selectedDestinations.filter(
          (destination) => destination.contentid !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default triprouteReducer;
