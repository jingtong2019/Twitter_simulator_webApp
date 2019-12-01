import * as types from "../actions/action-types";

const initialState = {
  feeds: {
      docs:[],
      hasMore: true
  },
  error: "",
  message: ""
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_FEEDS_SUCCESS:
            debugger;
            console.log("GET_FEEDS_SUCCESS");
            let feedResult = {...state.feeds};
            feedResult.docs = feedResult.docs.concat(action.result.docs);
            feedResult.hasMore = action.result.hasMore;
            return Object.assign({}, state, {
                error: "",
                message: "GET_FEEDS_SUCCESS",
                feeds: feedResult
            });
        case types.GET_FEEDS_FAILURE:
            console.log("GET_FEEDS_FAILURE");
            return Object.assign({}, state, {
                error: "GET_FEEDS_FAILURE",
                message: "",
                feeds: {
                    docs:[],
                    hasMore: true
                    }
            });
        case types.LIKE_TWEET_SUCCESS: 
            console.log("LIKE_TWEET_SUCCESS");
            feedResult = {...state.feeds};
            feedResult.docs.filter(function( obj ) {
                return obj._id === action.tweet._id;
            })[0].num_likes = 8;
            return Object.assign({}, state, {
                error: "",
                message: "GET_FEEDS_SUCCESS",
                feeds: feedResult
            });
        case types.LOGOUT_SUCCESS:
            return Object.assign(
                {}, state, {
                error: "",
                message: "",
                feeds: {
                    docs:[],
                    hasMore: true
                    }
                }
            );
        default:
            return state;
    }
}