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
    case types.REMOVE_TRANSACTION: {
      const { transactionId } = action.payload;
      return state.filter((tran) => tran._id !== transactionId);
    }
    default:
      return state;
  }
};

export default transactionReducer;
