import axios from "axios";

const host = "http://localhost:4010/api";

export function getUserFeeds(userId, pageNumber) {
    // axios.defaults.withCredentials = true;
    return axios.get(host + "/feeds/" + userId + "/" + pageNumber);
  }

export function blockFollowing(userId, followingUserId) {
  axios.defaults.withCredentials = true;
  return axios.post(host + "/blockFollowing/" + userId + "/" + followingUserId);
}

export function muteFollowing(userId, followingUserId) {
  axios.defaults.withCredentials = true;
  return axios.post(host + "/muteFollowing/" + userId + "/" + followingUserId);
}

export function likeTweet(userId, tweetId) {
  axios.defaults.withCredentials = true;
  return axios.post(host + "/likeTweet/" + userId + "/" + tweetId);
}

export function unlikeTweet(userId, tweetId) {
  axios.defaults.withCredentials = true;
  return axios.post(host + "/unlikeTweet/" + userId + "/" + tweetId);
}

export function reTweet(userId, tweetId) {
  axios.defaults.withCredentials = true;
  return axios.post(host + "/reTweet/" + userId + "/" + tweetId);
}

export function replyToTweet(userId, tweetId, body) {
  axios.defaults.withCredentials = true;
  return axios.post(host + "/replyToTweet/" + userId + "/" + tweetId, body);
}