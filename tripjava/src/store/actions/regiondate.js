import { SET_SELECTED_REGIONDATE } from './types';

export const setSelectedRegionDate = (regionName, startDate, endDate) => {
  return {
    type: SET_SELECTED_REGIONDATE,
    payload: { regionName, startDate, endDate },
  };
};
