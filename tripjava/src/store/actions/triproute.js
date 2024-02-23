export const ADD_ROUTE = 'ADD_ROUTE';
export const RESET_ROUTE = 'RESET_ROUTE';
export const REMOVE_ROUTE = 'REMOVE_ROUTE';

// 마커 추가
export const addRoute = (route) => ({
  type: ADD_ROUTE,
  payload: route,
});

// 마커 정보 초기화
export const resetRoute = () => ({
  type: RESET_ROUTE,
});
