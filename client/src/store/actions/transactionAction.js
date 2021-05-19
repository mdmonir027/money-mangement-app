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

// ! rename the function name
export const AddNewTransaction = (transaction, history) => (dispatch) => {
  axios
    .post(`${baseURL}/transaction`, transaction)
    .then((response) => {
      dispatch({
        type: types.ADD_NEW_TRANSACTION,
        payload: {
          transaction: response.data,
        },
      });

      history.push('/');
    })
    .catch((e) => {
      console.log(e);
    });
};

export const removeTransaction = (transactionId) => (dispatch) => {
  axios
    .delete(`${baseURL}/transaction/${transactionId}`)
    .then(() => {
      dispatch({
        type: types.REMOVE_TRANSACTION,
        payload: { transactionId },
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
