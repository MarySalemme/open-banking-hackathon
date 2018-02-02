
export const initialReviewResultsState = {
};

export default function auth(state = initialReviewResultsState, action) {
  switch (action.type) {
    case "SET_REVIEW_RESULTS":
      return {
        ...action.reviewResults
      };
    default:
      return state;
  }
}
