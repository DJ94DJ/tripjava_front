
export const setStartDate = (startDate) => ({
    type: 'planner/setStartDate',
    payload: startDate
  });
  
  export const setEndDate = (endDate) => ({
    type: 'planner/setEndDate',
    payload: endDate
  });
  
  export const setPlannerTitle = (title) => ({
    type: 'planner/setPlannerTitle',
    payload: title
  });

  export const setDetails = (details) => ({
  type: 'planner/setDetails',
  payload: details
});
  
export const setPlace = (place) => {
    return {
      type: 'planner/setPlace',
      payload: place
    }
  }
  
  export const setPrice = (price) => {
    return {
      type: 'planner/setPrice',
      payload: price
    }
  }