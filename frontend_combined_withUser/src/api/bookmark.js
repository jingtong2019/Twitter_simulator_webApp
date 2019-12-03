import axios from "axios";

const host = "http://ec2-54-67-17-39.us-west-1.compute.amazonaws.com:3001";


export function getBookmarks(userId) {
  // axios.defaults.withCredentials = true;
  let data = {
  	userid: userId
  };
  return axios.post(host + "/getBookmarks", data);
}

export function bookmarkTweet(userId, tweetId) {
  // axios.defaults.withCredentials = true;
  let data = {
  	userid: userId,
  	tweetid: tweetId
  };
  return axios.post(host + "/bookmark", data);
}

export function unbookmarkTweet(userId, tweetId) {
  // axios.defaults.withCredentials = true;
  let data = {
  	userid: userId,
  	tweetid: tweetId
  };
  return axios.post(host + "/unbookmark", data);
}