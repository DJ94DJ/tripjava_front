import { SET_SELECTED_REGION } from './actionTypes';

export const setSelectedRegion = (regionName) => {
  return {
    type: SET_SELECTED_REGION,
    payload: regionName,
  };
};
