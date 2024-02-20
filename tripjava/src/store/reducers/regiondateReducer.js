import { SET_SELECTED_REGIONDATE } from '../actions/types';

const initialState = {
  selectedRegionName: null,
  startDate: null,
  endDate: null,
};

const regiondateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_REGIONDATE:
      return {
        ...state,
        selectedRegionName: action.payload.regionName,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    default:
      return state;
  }
};

export default regiondateReducer;
