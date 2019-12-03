import { FOLLOWER_NO, FOLLOWING_NO ,FOLLOWERSDATA,FOLLOWINGDATA} from './action-types';
import axios from 'axios';
import { followingfollowerurl, rooturl } from '../config/settings';

export const followingCount = (userID) => async (dispatch) => {
  await axios.get('http://' + followingfollowerurl + ':4010/api/userFollowing/' + userID)
        .then(
            async (response) => {
                if (response.status === 200) {
                    console.log("Following count is ", response.data);
                    dispatch({
                        type: FOLLOWING_NO,
                        payload: response.data.followingCount
                    });
                }
            }
        )
}
export const followerCount = (userID) => async (dispatch) => {
   await axios.get('http://' + followingfollowerurl + ':4010/api/userFollowers/' + userID)
        .then(
            async (response) => {
                if (response.status === 200) {
                    console.log("Followers count is ", response.data);
                    dispatch({
                        type: FOLLOWER_NO,
                        payload: response.data.followersCount
                    });
                }

            }
        )
}
export const getfollowers = (userID) => async (dispatch) => {

    await axios.get('http://' + followingfollowerurl + ':4010/api/userFollowers/' + userID)
        .then(
            async (response) => {
                if (response.status === 200) {
                    let arr=[];
                    console.log("Followers data is ", response.data.followers);
                    for (var k = 0; k < response.data.followers.length; k++) {
                        let data = {
                            "userid": response.data.followers[k].userId
                        }
                        await axios.post('http://' + rooturl + ':5000/getProfileDetails', data)
                            .then(
                                async (response) => {
                                    if (response.status === 200) {
                                        if(response.data.result)
                                        {
                                        let obj = {
                                            userid: response.data.followers[k],
                                            details: response.data.result
                                        }
                                        arr.push(obj);
                                    }
                                    }
                                }
                            )
                    }
                    dispatch({
                        type: FOLLOWERSDATA,
                        payload: arr
                    });
                }

            }
        )
}
export const getfollowing = (userID) => async (dispatch) => {

    await axios.get('http://' + followingfollowerurl + ':4010/api/userFollowing/' + userID)
        .then(
            async (response) => {
                if (response.status === 200) {
                    let arr=[];
                    console.log("Following data is ", response.data.follows);
                    for (var k = 0; k < response.data.follows.length; k++) {
                      
                        let data = {
                            "userid": response.data.follows[k].userId
                        }
                       
                        await axios.post('http://' + rooturl + ':5000/getProfileDetails', data)
                            .then(
                                async (response) => {
                                    console.log("profile data is ",response.data.result);
                                    if (response.status === 200) {
                                        
                                        if(response.data.result)
                                        {
                                        let obj = {
                                            userid: response.data.follows[k].userId,
                                            details: response.data.result
                                        }
                                        arr.push(obj);
                                    }
                                    }
                                }
                            )
                    }
                    dispatch({
                        type: FOLLOWINGDATA,
                        payload: arr
                    });
                }

            }
        )
}
