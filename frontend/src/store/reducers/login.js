const initialState = {
  openLogin: false,
  displaySignUp: false,
  loading: false,
  error: null,
  userId: null,
  idToken: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_LOGIN":
      return {
        ...state,
        openLogin: !state.openLogin,
        displaySignUp: false
      };
    case "DISPLAY_SIGNUP":
      return {
        ...state,
        displaySignUp: true
      };
    case "HIDE_SIGNUP":
      return {
        ...state,
        displaySignUp: false
      };
    case "LOGIN_START":
      return {
        ...state,
        loading: true
      };
    case "LOGIN_SUCCESS":
      console.log(action.userId);
      return {
        ...state,
        loading: false,
        userId: action.userId,
        idToken: action.idToken,
        error: null,
        openLogin: false
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case "LOGIN_LOGOUT":
      return {
        ...state,
        idToken: null,
        userId: null
      };
  }
  return state;
};

export default reducer;
