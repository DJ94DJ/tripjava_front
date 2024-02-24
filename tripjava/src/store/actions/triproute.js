import { v4 as uuidv4 } from 'uuid';
export const ADD_ROUTE = 'ADD_ROUTE';
export const RESET_ROUTE = 'RESET_ROUTE';
export const REMOVE_ROUTE = 'REMOVE_ROUTE';

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

// 사용자가 선택한 경로 추가
export const addSelectedDestination = (destination) => ({
  type: 'ADD_SELECTED_DESTINATION',
  payload: destination,
});

export const removeSelectedDestination = (contentid) => ({
  type: 'REMOVE_SELECTED_DESTINATION',
  payload: contentid,
});
