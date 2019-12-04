import { GET_PROFILE, UPDATE_PROFILE, GET_USER_TWEET_SUCCESS, GET_USER_TWEET_FAILURE } from "../actions/action-types";
const initialState = {
  userTweets: {
    docs: []
  },
  profiledetails: {}
};

export default function(state = initialState, action) {
  console.log("in reducer file");
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profiledetails: action.payload,
        userTweets: state.userTweets
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profiledetails: action.payload,
        userTweets: state.userTweets
      };
    case GET_USER_TWEET_SUCCESS:
      console.log("GET_USER_TWEET_SUCCESS");
      var userTweets = {};
      userTweets.docs = action.result;
      return Object.assign({}, state, {
        error: "",
        message: "GET_USER_TWEET_SUCCESS",
        userTweets: userTweets
      });
    case GET_USER_TWEET_FAILURE:
      console.log("GET_USER_TWEET_FAILURE");
      return Object.assign({}, state, {
        error: "GET_USER_TWEET_FAILURE",
        message: "",
        userTweets: state.userTweets
      });
    default:
      return state;
  }
}
