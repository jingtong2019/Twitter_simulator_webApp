import { IS_FOLLOWING, FOLLOW, UNFOLLOW} from './action-types';

import axios from 'axios';
import { followurl } from '../config/settings';

export const isfollowing = (data) => async (dispatch) => {
   await axios.post('http://' + followurl + ':3001/getIsFollowed', data)
        .then(
            async (response) => {
                console.log("response data is ",response.data);
                if (response.status === 200) {
                    dispatch({
                        type: IS_FOLLOWING,
                        payload: response.data.isFollowed
                    });
                }
            }
        )
}
export const follow = (data) => async (dispatch) => {
  await axios.post('http://' + followurl + ':3001/follow', data)
        .then(
            async (response) => {
                if (response.status === 200) {
                    console.log("response data is ",response.data);
                    dispatch({
                        type: FOLLOW,
                        payload: true
                    });
                }

            }
        )
}

export const unfollow = (data) => async (dispatch) => {
   await axios.post('http://' + followurl + ':3001/unfollow', data)
         .then(
             async (response) => {
                 if (response.status === 200) {
                     console.log("response data is ",response.data);
                     dispatch({
                         type: UNFOLLOW,
                         payload: true
                     });
                 }
 
             }
         )
 }
