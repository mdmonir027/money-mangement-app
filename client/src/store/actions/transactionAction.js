import axios from 'axios';
import * as types from './types';

const baseURL = 'http://localhost:4000/api';

export const loadTransactions = () => (dispatch) => {
  console.log('load transactions');
  axios
    .get(`${baseURL}/transaction`)
    .then((response) => {
      //   console.log(response.data);
      dispatch({
        type: types.LOAD_TRANSACTIONS,
        payload: response.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
