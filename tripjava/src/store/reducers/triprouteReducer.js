import { SET_TRIPROUTE } from '../actions/types';

const initialState = {
  selectedRegionName: null,
  startDate: null,
  endDate: null,
  lat: null,
  lng: null,
};

const triprouteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRIPROUTE:
      return {
        ...state,
        selectedRegionName: action.payload.regionName,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
    default:
      return state;
  }
};

export default triprouteReducer;
