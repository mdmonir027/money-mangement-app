import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import * as types from './types';

export const register = (user, history) => (dispatch) => {
  axios
    .post('http://localhost:4000/api/user/register', user)
    .then((response) => {
      console.log(response); // todo remove later
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

export const login = (user, history) => (dispatch) => {
  axios
    .post('http://localhost:4000/api/user/login', user)
    .then((response) => {
      const token = response.data.token;
      const decodeToken = jwtDecode(token);
      setAuthToken(token);
      localStorage.setItem('auth_token', token);
      dispatch({
        type: types.SET_USER,
        payload: {
          user: decodeToken,
        },
      });
      history.push('/');
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

export const logout = () => (dispatch) => {
  localStorage.removeItem('auth_token');
  dispatch({
    type: types.SET_USER,
    payload: {
      user: {},
    },
  });
};
