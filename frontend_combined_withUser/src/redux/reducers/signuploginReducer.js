import {SIGNUP, LOGIN,DELETEUSER} from '../actions/action-types';
const initialState = {
  signupSuccess : false,
  loginSuccess :  false
}

export default function(state = initialState, action){
  switch(action.type){
      case SIGNUP: 
          return {
              ...state,
              signupSuccess : action.signupSuccess
          }
      case LOGIN: 
          return {
              ...state,
              loginSuccess : action.loginSuccess
          }
      case DELETEUSER: 
          return {
              ...state,
              deleteSuccess : action.deleteSuccess
          }
      default: 
          return state;
  }
}