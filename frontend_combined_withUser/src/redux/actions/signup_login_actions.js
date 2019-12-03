import { SIGNUP ,LOGIN, DELETEUSER} from './action-types';
import axios from 'axios';
import { rooturl } from '../config/settings';

export const signup = (data) => async (dispatch) => {

    
    await axios.post('http://' + rooturl + ':5000/signup', data)
        .then(
            (response) => {
                if (response.status === 200) {
                    console.log("in signup response 200",response.data.data.signupSuccess);
                    dispatch({
                        type: SIGNUP,
                        signupSuccess: response.data.data.signupSuccess
                    });
                }
                else {
                    console.log("response is 202",response.data.data.signupSuccess);
                    dispatch({
                        type: SIGNUP,
                        signupSuccess: response.data.data.signupSuccess
                    });
                }

            }
        )
}
export const login = (data) => async (dispatch) => {

    
    await axios.post('http://' + rooturl + ':5000/login', data)
        .then(
            (response) => {
                if (response.status === 200) {
                    console.log("response data is "+JSON.stringify(response.data))
                   
                    localStorage.setItem("cookie1", response.data.cookies.cookie1);
                    localStorage.setItem("cookie2", response.data.cookies.cookie2);
                    localStorage.setItem("cookie3", response.data.cookies.cookie3);
                    localStorage.setItem("token", response.data.cookies.token);

                    dispatch({
                        type: LOGIN,
                        loginSuccess: response.data.result.result[0]
                    });
                }
                else {
                    console.log("response is 202");
                    dispatch({
                        type: LOGIN,
                        loginSuccess: false
                    });
                }

            }
        )
}
export const deleteuser = (data) => async (dispatch) => {

 
    await axios.post('http://' + rooturl + ':5000/delete', data)
        .then(
            (response) => {
                if (response.status === 200) {
                    console.log("in delete response 200",response.data);
                    dispatch({
                        type: DELETEUSER,
                        deleteSuccess: response.data.deleteSuccess
                    });
                }
                else {
                    console.log("response is 202");
                    dispatch({
                        type: DELETEUSER,
                        deleteSuccess: response.data.deleteSuccess
                    });
                }

            }
        )
}

