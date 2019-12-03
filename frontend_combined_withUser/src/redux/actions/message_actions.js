import  { NEW_MESSAGE, INBOX_MESSAGES } from './action-types';
import axios from 'axios';
import { rooturl } from '../config/settings';

export const postMessage = (data) => async (dispatch) => {
    console.log("IN POSTMESSAGE ");
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    
    await axios.post('http://'+rooturl+':5000/newmessage',data,config)
    .then(async (response) => {
        if (response.status === 200) {
            dispatch({
                type: NEW_MESSAGE,
                payload: response.data
            });
        }
    }
    )
}
export const getInboxMessages = (email1) => async (dispatch) => {
    console.log("IN  GETINBOXMESSAGES   ",email1);
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    
    let email={
        "email":email1
    }
    await axios.post('http://'+rooturl+':5000/inbox/messages',email,config)
    .then(async (response) => {
        if (response.status === 200) {
            console.log("IN RESPONSE   "+response.data);
            dispatch({
                type: INBOX_MESSAGES,
                payload: response.data
            });
        }
    }
    ) 
}
