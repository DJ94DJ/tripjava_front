import { ADD_MARKER, RESET_MARKERS } from '../actions/triproute';

const initialState = {
  markers: [], // 마커 정보를 저장할 배열
};

const triprouteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MARKER:
      return {
        ...state,
        markers: [...state.markers, action.payload],
      };
    case RESET_MARKERS:
      return {
        ...state,
        markers: [],
      };
    default:
      return state;
  }
};

export default triprouteReducer;
