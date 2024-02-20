// reducers/auth.js
import { SET_AUTH } from "../actions/auth";

const initialState = {
  token: null,
  id: null,
  nickname: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        token: action.payload.auth,
        id: action.payload.id,
        nickname: action.payload.nickname,
      };
    case "LOGOUT":
      return initialState; // 상태를 초기 상태로 돌려놓습니다.
    default:
      return state;
  }
};

export default authReducer;
