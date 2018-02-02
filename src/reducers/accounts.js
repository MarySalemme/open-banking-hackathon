export const initialAccountState = {
};

export default function accounts(state = initialAccountState, action) {
  switch (action.type) {
    case "SET_ACCOUNTS":
      return {
        ...action.accounts
      };
    default:
      return state;
  }
}