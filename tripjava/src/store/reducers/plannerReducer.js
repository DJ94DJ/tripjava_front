const initialState = {
    startDate: '',
    endDate: '',
    plannerTitle: '',
    details : '',
    place : '',
    price : ''
  };
  
  const plannerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'planner/setStartDate':
        return { ...state, startDate: action.payload };
        case 'planner/setEndDate':
            return { ...state, endDate: action.payload };
        case 'planner/setPlace':
            return { ...state, place: action.payload };
      case 'planner/setPlannerTitle':
        return { ...state, plannerTitle: action.payload };
        case 'planner/setDetails':
            return { ...state, details: action.payload };
        case 'planner/setPrice':
            return { ...state, price: action.payload };
      default:
        return state;
    }
  };
  
  export default plannerReducer;
  