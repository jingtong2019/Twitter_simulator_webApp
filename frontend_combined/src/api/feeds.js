import axios from "axios";

// const host = "http://localhost:4010/api";
const host = "http://ec2-35-161-86-90.us-west-2.compute.amazonaws.com:4010/api";

export function getUserFeeds(userId, pageNumber) {
  // axios.defaults.withCredentials = true;
  return axios.get(host + "/feeds/" + userId + "/" + pageNumber);
}

export function blockFollowing(userId, followingUserId) {
// axios.defaults.withCredentials = true;
return axios.post(host + "/blockFollowing/" + userId + "/" + followingUserId);
}

export function muteFollowing(userId, followingUserId) {
// axios.defaults.withCredentials = true;
return axios.post(host + "/muteFollowing/" + userId + "/" + followingUserId);
}

export function likeTweet(userId, tweetId) {
// axios.defaults.withCredentials = true;
return axios.post(host + "/likeTweet/" + userId + "/" + tweetId);
}

export function unlikeTweet(userId, tweetId) {
// axios.defaults.withCredentials = true;
return axios.post(host + "/unlikeTweet/" + userId + "/" + tweetId);
}

export function reTweet(userId, tweetId) {
// axios.defaults.withCredentials = true;
return axios.post(host + "/reTweet/" + userId + "/" + tweetId);
}

export function replyToTweet(userId, tweetId, content, userImage) {
// axios.defaults.withCredentials = true;
var payload = {
  content: content,
  userImage: userImage
}
return axios.post(host + "/replyToTweet/" + userId + "/" + tweetId, payload);
}