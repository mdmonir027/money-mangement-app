import axios from 'axios';
import * as types from './types';

export const register = (user, history) => (dispatch) => {
  axios
    .post('http://localhost:4000/api/user/register', user)
    .then((response) => {
      console.log(response);
      dispatch({
        type: types.USER_ERROR,
        payload: {
          errors: {},
        },
      });
      history.push('/login');
    })
    .catch((e) => {
      dispatch({
        type: types.USER_ERROR,
        payload: {
          errors: e.response.data,
        },
      });
    });
};
