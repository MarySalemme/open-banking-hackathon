export const initialTransactionState = {
};

export default function transactions(state = initialTransactionState, action) {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return {
        ...action.transactions
      };
    default:
      return state;
  }
}