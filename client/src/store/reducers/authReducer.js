import * as types from '../actions/types';

const init = {
  isAuthenticated: false,
  user: {},
  errors: {},
};

const authReducer = (state = init, action) => {
  switch (action.type) {
    case types.SET_USER: {
      return {
        user: action.payload.user,
        isAuthenticated: Object.keys(action.payload.user).length !== 0,
        errors: {},
      };
    }
    case types.USER_ERROR: {
      return {
        ...state,
        errors: action.payload.errors,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
