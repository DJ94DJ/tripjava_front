import { SET_SELECTED_REGION } from '../actions/types';

const initialState = {
  selectedRegionName: null,
};

const regionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_REGION:
      return {
        ...state,
        selectedRegionName: action.payload,
      };
    default:
      return state;
  }
};

export default regionReducer;
