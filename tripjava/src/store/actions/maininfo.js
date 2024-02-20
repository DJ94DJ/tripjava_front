import { SET_MAININFO } from './types';

export const setSelectedRegionDate = (
  regionName,
  startDate,
  endDate,
  lat,
  lng
) => {
  return {
    type: SET_MAININFO,
    payload: { regionName, startDate, endDate, lat, lng },
  };
};
