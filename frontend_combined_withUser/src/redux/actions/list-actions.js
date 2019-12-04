import * as types from "./action-types";
import * as listApi from "../../api/list";

export function getlisttweets(userIds, config, callback) {
    return function(dispatch) {
        debugger;
      return listApi
        .getlisttweets(userIds, config)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            callback("SUCCESS", response.data);
            dispatch(getlistSuccess(response.data));
            }
        })
        .catch(error => {
               dispatch(getlistFailure());
       });
    };
  }

   export function getlistSuccess(result) {
    return { type: types.GET_LIST_SUCCESS, result };
  }

  export function getlistFailure() {
    return { type: types.GET_LIST_FAILURE};
  }

  export function clearFeeds() {
    return { type: types.CLEAR_FEEDS };
  }

  export function getUserlists( callback) {
    return function(dispatch) {
        debugger;
      return listApi
        .getUserlists()
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log('response data for list')
            console.log(response.data)
            callback("SUCCESS", response.data);
            dispatch({type:types.GET_USER_LIST,payload: response.data});
            }
        })
        .catch(error => {
          //callback("FAILURE", null);  
       });
    };
  }

  export function getlists(result) {
    return  {type:types.GET_USER_LIST,payload: result};
  }