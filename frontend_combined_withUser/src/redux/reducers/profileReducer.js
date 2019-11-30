import {GET_PROFILE,UPDATE_PROFILE} from '../actions/action-types';
const initialState = {
    profiledetails:{}
}

export default function(state = initialState, action){
  console.log("in reducer file");
  switch(action.type){
      case GET_PROFILE: 
          return {
              ...state,
              profiledetails : action.payload
          }
          case UPDATE_PROFILE: 
          return {
              ...state,
              profiledetails : action.payload
          } 
      default: 
          return state;
  }
}