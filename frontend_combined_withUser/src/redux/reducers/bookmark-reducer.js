import * as types from "../actions/action-types";

const initialState = {
    bookmarkedTweets: {
        docs:[]
    },
    error: "",
    message: ""
};

export default function bookmarkReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_BOOKMARKS_SUCCESS:
            debugger;
            console.log("GET_BOOKMARKS_SUCCESS");
            var bookmarkedTweets = {};
            bookmarkedTweets.docs = action.result.result;
            return Object.assign({}, state, {
                error: "",
                message: "GET_BOOKMARKS_SUCCESS",
                bookmarkedTweets: bookmarkedTweets
            });
        case types.BOOKMARK_TWEET_SUCCESS:
            debugger;
            var bookmarkedTweets = {};
            bookmarkedTweets.docs = [];
            return Object.assign({}, state, {
                error: "",
                message: "BOOKMARK_TWEET_SUCCESS",
                bookmarkedTweets: bookmarkedTweets
            });
        case types.UNBOOKMARK_TWEET_SUCCESS:
            var bookmarkedTweets = {};
            bookmarkedTweets.docs = [];
            return Object.assign({}, state, {
                error: "",
                message: "UNBOOKMARK_TWEET_SUCCESS"
            });
        default:
            return state;
    }
}