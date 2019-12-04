import { GET_PROFILE, UPDATE_PROFILE } from './action-types';
import axios from 'axios';
import { rooturl } from '../config/settings';
import * as tweetApi from "../../api/tweet";
import * as types from "./action-types";

export const profileaction = (data) => async (dispatch) => {
    
    await axios.post('http://' + rooturl + ':5000/getProfileDetails', data)
        .then(
            async (response) => {
                if (response.status === 200) {
                    
                    dispatch({
                        type: GET_PROFILE,
                        payload: response.data.result
                    });
                }
            }
        )
}
export const updateProfile = (data) => async (dispatch) => {

    await axios.post('http://' + rooturl + ':5000/updateprofile', data)
        .then(
            async (response) => {
                if (response.status === 200) {
                    
                    dispatch({
                        type: UPDATE_PROFILE,
                        payload: response.data.profiledetails[0]
                    });
                }

            }
        )
}

export function getLoggedInUserTweets(userId, callback) {
    return function(dispatch) {
        debugger;
      return tweetApi
        .getLoggedInUserTweets(userId)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            callback("SUCCESS", response.data);
            dispatch(getLoggedInUserTweetsSuccess(response.data.result));
          }
        })
        .catch(error => {
          // if (error.message === "Network Error") {
          //   dispatch(networkConnectionError());
          // } else {
            dispatch(getLoggedInUserTweetsFailure());
          // }
        });
    };
  }

  export function getLoggedInUserTweetsSuccess(result) {
    return { type: types.GET_USER_TWEET_SUCCESS, result };
  }

  export function getLoggedInUserTweetsFailure() {
    return { type: types.GET_USER_TWEET_FAILURE };
  }

