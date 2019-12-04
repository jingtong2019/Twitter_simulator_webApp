import axios from "axios";

//const host = "http://localhost:3001";
const host = "http://54.153.73.30:3001";



export function subscibeList(userhandle, list_id) {
  console.log("getlisttweets")
 // axios.defaults.withCredentials = true;
  let data = {
     list_id: list_id,
    userhandle: userhandle
   };
  return axios.get(host + "/subscibeList", data);
}

export function getlisttweets(userId, pageNumber) {
  console.log("getlisttweets")
  //axios.defaults.withCredentials = true;
  let data = {
  	userhandle: userId,
  	pageNumber: pageNumber
  };
  return axios.get(host + "/getAllUserTweets", data);
}

export function getUserlists() {
  console.log("getlisttweets")
  //axios.defaults.withCredentials = true;
 
  let data = {
    userhandle: localStorage.getItem('searchuserhandle')
  }
  return axios.post(host + "/getUserLists", data);
}


