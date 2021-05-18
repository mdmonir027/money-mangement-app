import * as types from '../actions/types';

const transactionReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_TRANSACTIONS: {
      console.log(action.payload);
      return action.payload.transactions;
    }
    default:
      return state;
  }
};

export default transactionReducer;
