import axios from "axios";

const host = "http://localhost:3001";


export function getBookmarks(userId, pageNumber) {
  axios.defaults.withCredentials = true;
  let data = {
  	userid: userId,
  	pageNumber: pageNumber
  };
  return axios.post(host + "/getBookmarks", data);
}
