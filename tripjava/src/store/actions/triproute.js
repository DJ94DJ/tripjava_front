export const ADD_MARKER = 'ADD_MARKER';
export const RESET_MARKERS = 'RESET_MARKERS';

// 마커 추가
export const addMarker = (marker) => ({
  type: ADD_MARKER,
  payload: marker,
});

// 마커 정보 초기화
export const resetMarkers = () => ({
  type: RESET_MARKERS,
});
