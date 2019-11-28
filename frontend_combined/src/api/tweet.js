import axios from "axios";

const host = "http://localhost:3001";


export function tweet(data, config) {
  axios.defaults.withCredentials = true;
  return axios.post(host + "/tweet", data, config);
}
