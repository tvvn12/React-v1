import {
  FETCH_USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,

  
} from "../action/userAction";
const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: "",
    email: "",
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT?.access_token || action.payload.access_token,
          refresh_token: action?.payload?.DT?.refresh_token || action.payload.refresh_token,
          username: action?.payload?.DT?.username || action.payload.username,
          image: action?.payload?.DT?.image || action.payload.image,
          role: action?.payload?.DT?.role || action.payload.role,
          email: action?.payload?.DT?.email|| action.payload.email,
        },
        isAuthenticated: true,
      };
      
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          access_token: "",
          refresh_token: "",
          username: "",
          image: "",
          role: "",
          email: "",
        },
        isAuthenticated: false,
      };
   
    default:
      return state;
  }
};

export default userReducer;
