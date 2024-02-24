export const SET_PLANNER_ID = "SET_PLANNER_ID";

export const setPlannerId = (plannerId) => ({
  type: SET_PLANNER_ID,
  payload: plannerId,
});

export const clearPlannerId = () => ({
  type: SET_PLANNER_ID,
  payload: null,
});
