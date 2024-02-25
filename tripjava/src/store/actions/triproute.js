import { v4 as uuidv4 } from 'uuid';
export const ADD_ROUTE = 'ADD_ROUTE';
export const RESET_ROUTE = 'RESET_ROUTE';
export const REMOVE_ROUTE = 'REMOVE_ROUTE';
export const REMOVE_SPOT = 'REMOVE_SPOT';

// 경로 추가
export const addRoute = (route) => ({
  type: ADD_ROUTE,
  payload: { ...route, id: uuidv4() },
});

// 경로 정보 초기화
export const resetRoute = () => ({
  type: RESET_ROUTE,
});

// 경로 삭제
export const removeRoute = (id) => ({
  type: REMOVE_ROUTE,
  payload: id,
});

// 날짜, 관광지, 음식점 추가
export const addSpot = (selectedDate, spot) => ({
  type: 'ADD_SPOT',
  payload: { selectedDate, spot },
});
// 날짜, 관광지, 음식점 삭제
export const removeSpot = (selectedDate, id) => ({
  type: REMOVE_SPOT,
  payload: { selectedDate, id },
});
