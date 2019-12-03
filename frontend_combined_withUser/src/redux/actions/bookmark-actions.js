import * as types from "./action-types";
import * as bookmarkApi from "../../api/bookmark";


export function networkConnectionError() {
	return { type: types.NETWORK_CONNECTION_ERROR };
}

  export function getBookmarks(data, callback) {
    return function(dispatch) {
        debugger;
      return bookmarkApi
        .getBookmarks(data)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            callback("SUCCESS", response.data);
            dispatch(getBookmarksSuccess(response.data));
          }
        })
        .catch(error => {
          if (error.message === "Network Error") {
            dispatch(networkConnectionError());
          } else {
            dispatch(getBookmarksFailure());
          }
        });
    };
  }

  export function getBookmarksSuccess(result) {
    return { type: types.GET_BOOKMARKS_SUCCESS, result };
  }

  export function getBookmarksFailure() {
    return { type: types.GET_BOOKMARKS_FAILURE };
  }

  export function bookmarkTweet(userId, tweetId, callback) {
    return function(dispatch) {
        debugger;
      return bookmarkApi
        .bookmarkTweet(userId, tweetId)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            callback("SUCCESS", response.data);
            dispatch(bookmarkTweetSuccess(response.data));
          }
        })
        .catch(error => {
          if (error.message === "Network Error") {
            dispatch(networkConnectionError());
          } else {
            dispatch(bookmarkTweetFailure());
          }
        });
    };
  }

  export function bookmarkTweetSuccess(result) {
    return { type: types.BOOKMARK_TWEET_SUCCESS, result };
  }

  export function bookmarkTweetFailure() {
    return { type: types.BOOKMARK_TWEET_FAILURE };
  }


  export function unbookmarkTweet(userId, tweetId, callback) {
    return function(dispatch) {
        debugger;
      return bookmarkApi
        .unbookmarkTweet(userId, tweetId)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            callback("SUCCESS", response.data);
            dispatch(unbookmarkTweetSuccess(response.data));
          }
        })
        .catch(error => {
          if (error.message === "Network Error") {
            dispatch(networkConnectionError());
          } else {
            dispatch(unbookmarkTweetFailure());
          }
        });
    };
  }

  export function unbookmarkTweetSuccess(result) {
    return { type: types.UNBOOKMARK_TWEET_SUCCESS, result };
  }

  export function unbookmarkTweetFailure() {
    return { type: types.UNBOOKMARK_TWEET_FAILURE };
  }