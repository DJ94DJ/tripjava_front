// actions/auth.js
export const SET_AUTH = "SET_AUTH";

export const setAuth = (auth, id, nickname) => ({
  type: SET_AUTH,
  payload: { auth, id, nickname },
});

export const logout = () => ({
  type: "LOGOUT",
});
