export const initialAuthState = {
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...action.token
      };
    default:
      return state;
  }
}
