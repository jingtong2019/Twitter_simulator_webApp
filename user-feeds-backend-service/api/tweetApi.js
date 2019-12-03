const appConfig = require('../config/main');
var axios = require('axios');

module.exports = {
    getUserTweets: function(userId) {
        axios.defaults.withCredentials = true;
        var payload = { "userid": userId};
        return axios.get(appConfig.tweetServiceUrl + "/getUserTweet/" + userId);
      },
    getUserTweets_jing: function(userId) {
      axios.defaults.withCredentials = true;
      var payload = { "userid": userId};
      return axios.post(appConfig.tweetServiceUrl + "/getUserTweet", payload);
    }
}