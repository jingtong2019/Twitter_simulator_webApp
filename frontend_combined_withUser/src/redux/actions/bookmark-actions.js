import * as types from "./action-types";
import * as bookmarkApi from "../../api/bookmark";

  export function getBookmarks(data, config, callback) {
    return function(dispatch) {
        debugger;
      return bookmarkApi
        .getBookmarks(data, config)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            callback("SUCCESS", response.data);
            dispatch(getBookmarksSuccess(response.data));
          }
        })
        .catch(error => {
          // if (error.message === "Network Error") {
          //   dispatch(networkConnectionError());
          // } else {
            dispatch(getBookmarksFailure());
          // }
        });
    };
  }

  export function getBookmarksSuccess(result) {
    return { type: types.GET_BOOKMARKS_SUCCESS, result };
  }

  export function getBookmarksFailure() {
    return { type: types.GET_BOOKMARKS_FAILURE };
  }