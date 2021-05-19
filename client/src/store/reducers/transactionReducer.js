import * as types from '../actions/types';

const transactionReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_TRANSACTIONS: {
      return action.payload.transactions;
    }
    case types.ADD_NEW_TRANSACTION: {
      const transactions = [...state];
      transactions.unshift(action.payload.transaction);
      return transactions;
    }
    default:
      return state;
  }
};

export default transactionReducer;
