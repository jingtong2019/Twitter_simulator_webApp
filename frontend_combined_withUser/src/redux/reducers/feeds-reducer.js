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
            var feedResult = {...state.feeds};
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
            debugger;
            console.log("LIKE_TWEET_SUCCESS");
            var feedResult = {...state.feeds};
            // var likeCount = feedResult.docs.filter(function( obj ) {
            //     return obj._id === action.result._id;
            // })[0].likeCount++;
            for (var i = 0; i < feedResult.docs.length; i++) {
                if (feedResult.docs[i]._id === action.result._id) {
                    feedResult.docs[i].likes = action.result.likes;
                    feedResult.docs[i].likeCount += 1;
                }
            }
            
            return Object.assign({}, state, {
                error: "",
                message: "LIKE_TWEET_SUCCESS",
                feeds: feedResult
            });
        case types.UNLIKE_TWEET_SUCCESS:
                debugger;
                console.log("UNLIKE_TWEET_SUCCESS");
                var feedResult = {...state.feeds};
                var likeCount = feedResult.docs.filter(function( obj ) {
                    return obj._id === action.result._id;
                })[0].likeCount--;
                feedResult.docs.filter(function( obj ) {
                    return obj._id === action.result._id;
                })[0].likes = action.result.likes;
                return Object.assign({}, state, {
                    error: "",
                    message: "UNLIKE_TWEET_SUCCESS",
                    feeds: feedResult
                });
        case types.RETWEET_SUCCESS:
                debugger;
                console.log("RETWEET_SUCCESS");
                var feedResult = {...state.feeds};
                feedResult.docs.filter(function( obj ) {
                    return obj._id === action.result._id;
                })[0].reTweetCount++;
                return Object.assign({}, state, {
                    error: "",
                    message: "RETWEET_SUCCESS",
                    feeds: feedResult
                });
        case types.REPLYTO_TWEET_SUCCESS:
                console.log("REPLYTO_TWEET_SUCCESS");
                var feedResult = {...state.feeds};
                feedResult.docs.filter(function( obj ) {
                    return obj._id === action.result.tweetId;
                })[0].comments.push(action.result);
                return Object.assign({}, state, {
                    error: "",
                    message: "REPLYTO_TWEET_SUCCESS",
                    feeds: feedResult
                });
        case types.CLEAR_FEEDS:
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