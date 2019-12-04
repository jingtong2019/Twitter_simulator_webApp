import axios from "axios";

const host = "http://ec2-18-223-2-86.us-east-2.compute.amazonaws.com:5000";

export function getAllUsersDetails() {
    return axios.get(host + "/getAllUsersDetails");
  }