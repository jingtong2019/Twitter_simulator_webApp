import axios from "axios";

//const host = "http://localhost:3001";
const host = "http://54.153.73.30:3001";
const jing_host = "http://ec2-54-67-17-39.us-west-1.compute.amazonaws.com:3001";


export function subscibeList(userhandle, list_id) {
  console.log("getlisttweets")
 // axios.defaults.withCredentials = true;
  let data = {
     list_id: list_id,
    userhandle: userhandle
   };
  return axios.get(host + "/subscibeList", data);
}

export function getlisttweets(userIds, pageNumber) {
  console.log("getlisttweets")
  //axios.defaults.withCredentials = true;
  let data = {
  	id: userIds
  };
  return axios.post(jing_host + "/getAllUserTweets", data);
}

export function getUserlists() {
  console.log("getlisttweets")
  //axios.defaults.withCredentials = true;
 
  let data = {
    userhandle: localStorage.getItem('searchuserhandle')
  }
  return axios.post(host + "/getUserLists", data);
}


