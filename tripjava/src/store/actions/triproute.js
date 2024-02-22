import { SET_TRIPROUTE } from './types';

export const setSelectedRegionDate = (
  regionName,
  startDate,
  endDate,
  lat,
  lng
) => {
  return {
    type: SET_TRIPROUTE,
    payload: { regionName, startDate, endDate, lat, lng },
  };
};
