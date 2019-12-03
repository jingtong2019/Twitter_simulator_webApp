import { GET_PROFILE, UPDATE_PROFILE } from './action-types';
import axios from 'axios';
import { rooturl } from '../config/settings';

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

