import * as types from '../actions/types';

const transactionReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_TRANSACTIONS: {
      return action.payload.transactions;
    }
    case types.ADD_NEW_TRANSACTION: {
      console.log(action);
      return [action.payload.transaction, ...state];
    }
    default:
      return state;
  }
};

export default transactionReducer;
