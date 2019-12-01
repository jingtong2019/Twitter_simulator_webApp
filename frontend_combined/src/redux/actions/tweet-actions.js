import * as types from "./action-types";
import * as tweetApi from "../../api/tweet";


// export function networkConnectionError() {
// 	return { type: types.NETWORK_CONNECTION_ERROR };
// }

  export function tweet(data, config, callback) {
    return function(dispatch) {
        debugger;
      return tweetApi
        .tweet(data, config)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            callback("SUCCESS", response.data);
            dispatch(tweetSuccess(response.data));
          }
        })
        .catch(error => {
          // if (error.message === "Network Error") {
          //   dispatch(networkConnectionError());
          // } else {
            dispatch(tweetFailure());
          // }
        });
    };
  }

  export function tweetSuccess(result) {
    return { type: types.TWEET_SUCCESS, result };
  }

  export function tweetFailure() {
    return { type: types.TWEET_FAILURE };
  }