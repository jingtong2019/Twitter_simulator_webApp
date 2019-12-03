import {FOLLOWER_NO,FOLLOWING_NO,IS_FOLLOWING, FOLLOW, UNFOLLOW, FOLLOWERSDATA,FOLLOWINGDATA } from '../actions/action-types';
const initialState = {
follow:false,
unfollow:false,
isfollowing:false,
followbuttonclickvalue:true,
unfollowbuttonclickvalue:false
}
export default function(state = initialState, action){
  console.log("in reducer file");
  switch(action.type){
        case FOLLOWER_NO: 
          return {
              ...state,
              followerCount : action.payload
          }
         case FOLLOWING_NO: 
          return {
              ...state,
              followingCount : action.payload
          } 
         case IS_FOLLOWING: 
          return {
              ...state,
              isfollowing : action.payload
          } 
          case FOLLOW: 
          return {
              ...state,
              follow : action.payload,
              unfollow:!action.payload
          } 
          case UNFOLLOW: 
          return {
              ...state,
              unfollow : action.payload,
              follow:!action.payload
          } 
          case FOLLOWERSDATA: 
          return {
              ...state,
              followersdata:action.payload
          } 
          case FOLLOWINGDATA: 
          return {
              ...state,
              followingdata:action.payload
          } 
         
      default: 
          return state;
  }
}

