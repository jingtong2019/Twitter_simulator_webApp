import axios from "axios";

// const host = "http://localhost:3001";
const host = "http://ec2-54-67-17-39.us-west-1.compute.amazonaws.com:3001";


export function tweet(data, config) {
  axios.defaults.withCredentials = true;
  return axios.post(host + "/tweet", data, config);
}

export function unfollowUser(userId, unfollowedUserId) {
  var data = {
    userid: userId,
    userid_to_unfollow: unfollowedUserId
  }
  return axios.post(host + "/unfollow", data);
}
