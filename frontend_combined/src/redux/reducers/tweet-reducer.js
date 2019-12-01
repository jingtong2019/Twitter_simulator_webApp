import * as types from "../actions/action-types";

const initialState = {
  error: "",
  message: ""
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case types.TWEET_FAILURE:
            console.log("TWEET_FAILURE");
            return Object.assign({}, state, {
                error: "TWEET_FAILURE",
                message: ""
            });
        case types.TWEET_SUCCESS: 
            console.log("TWEET_SUCCESS");
            return Object.assign({}, state, {
                error: "",
                message: "TWEET_SUCCESS"
            });
        default:
            return state;
    }
}