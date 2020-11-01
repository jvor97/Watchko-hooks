/* eslint-disable default-case */
// import * as actionTypes from '../actions/actionTypes';

let initialState = {
  openGenres: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_GENRES":
      return {
        ...state,
        openGenres: !state.openGenres
      };
  }
  return state;
};

export default reducer;
