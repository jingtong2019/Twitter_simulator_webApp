import * as types from "./action-types";
import * as feedsApi from "../../api/feeds";

export function networkConnectionError() {
    return { type: types.NETWORK_CONNECTION_ERROR };
  }

export function getUserFeeds(userId, pageNumber, callback) {
    return function(dispatch) {
        debugger;
      return feedsApi
        .getUserFeeds(userId, pageNumber)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            callback("SUCCESS", response.data);
            dispatch(getFeedSuccess(response.data));
          }
        })
        .catch(error => {
          if (error.message === "Network Error") {
            dispatch(networkConnectionError());
          } else {
            dispatch(getFeedFailure());
          }
        });
    };
  }

  export function getFeedSuccess(result) {
    return { type: types.GET_FEEDS_SUCCESS, result };
  }

  export function getFeedFailure() {
    return { type: types.GET_FEEDS_FAILURE };
  }

  export function blockFollowing(userId, followingUserId, callback) {
    return function(dispatch) {
        debugger;
      return feedsApi
        .blockFollowing(userId, followingUserId)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            callback("SUCCESS", response.data);
            dispatch(blockFollowingSuccess(response.data));
          }
        })
        .catch(error => {
          if (error.message === "Network Error") {
            dispatch(networkConnectionError());
          } else {
            dispatch(blockFollowingFailure());
          }
        });
    };
  }

  export function blockFollowingSuccess(result) {
    return { type: types.BLOCK_FOLLOWING_SUCCESS, result };
  }

  export function blockFollowingFailure() {
    return { type: types.BLOCK_FOLLOWING_FAILURE };
  }

  export function muteFollowing(userId, followingUserId, callback) {
    return function(dispatch) {
        debugger;
      return feedsApi
        .muteFollowing(userId, followingUserId)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            callback("SUCCESS", response.data);
            dispatch(muteFollowingSuccess(response.data));
          }
        })
        .catch(error => {
          if (error.message === "Network Error") {
            dispatch(networkConnectionError());
          } else {
            dispatch(muteFollowingFailure());
          }
        });
    };
  }

  export function muteFollowingSuccess(result) {
    return { type: types.MUTE_FOLLOWING_SUCCESS, result };
  }

  export function muteFollowingFailure() {
    return { type: types.MUTE_FOLLOWING_FAILURE };
  }

  export function likeTweet(userId, tweetId, callback) {
    return function(dispatch) {
        debugger;
      return feedsApi
        .likeTweet(userId, tweetId)
        .then(response => {
            debugger;
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            callback("SUCCESS", response.data);
            dispatch(likeTweetSuccess(response.data));
          }
        })
        .catch(error => {
          if (error.message === "Network Error") {
            dispatch(networkConnectionError());
          } else {
            dispatch(likeTweetFailure());
          }
        });
    };
  }

  export function likeTweetSuccess(result) {
    return { type: types.LIKE_TWEET_SUCCESS, result };
  }

  export function likeTweetFailure() {
    return { type: types.LIKE_TWEET_FAILURE };
  }


  export function unlikeTweet(userId, tweetId, callback) {
    return function(dispatch) {
        debugger;
      return feedsApi
        .unlikeTweet(userId, tweetId)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            callback("SUCCESS", response.data);
            dispatch(unlikeTweetSuccess(response.data));
          }
        })
        .catch(error => {
          if (error.message === "Network Error") {
            dispatch(networkConnectionError());
          } else {
            dispatch(unlikeTweetFailure());
          }
        });
    };
  }

  export function unlikeTweetSuccess(result) {
    return { type: types.UNLIKE_TWEET_SUCCESS, result };
  }

  export function unlikeTweetFailure() {
    return { type: types.UNLIKE_TWEET_FAILURE };
  }

  export function reTweet(userId, tweetId, callback) {
    return function(dispatch) {
        debugger;
      return feedsApi
        .reTweet(userId, tweetId)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            callback("SUCCESS", response.data);
            dispatch(reTweetSuccess(response.data));
          }
        })
        .catch(error => {
          if (error.message === "Network Error") {
            dispatch(networkConnectionError());
          } else {
            dispatch(reTweetFailure());
          }
        });
    };
  }

  export function reTweetSuccess(result) {
    return { type: types.RETWEET_SUCCESS, result };
  }

  export function reTweetFailure() {
    return { type: types.RETWEET_FAILURE };
  }

  export function replyToTweet(userId, tweetId, content, userImage, callback) {
    return function(dispatch) {
        debugger;
      return feedsApi
        .replyToTweet(userId, tweetId, content, userImage)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            callback("SUCCESS", response.data);
            dispatch(replyToTweetSuccess(response.data));
          }
        })
        .catch(error => {
          if (error.message === "Network Error") {
            dispatch(networkConnectionError());
          } else {
            dispatch(replyToTweetFailure());
          }
        });
    };
  }

  export function replyToTweetSuccess(result) {
    return { type: types.REPLYTO_TWEET_SUCCESS, result };
  }

  export function replyToTweetFailure() {
    return { type: types.REPLYTO_TWEET_FAILURE };
  }


  export function clearFeeds() {
    return { type: types.CLEAR_FEEDS };
  }