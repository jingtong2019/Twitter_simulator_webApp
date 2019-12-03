const appConfig = require('../config/main');
var axios = require('axios');

module.exports = {
    getRandomNames: function(count) {
        axios.defaults.withCredentials = true;
        return axios.get("http://names.drycodes.com/" + count);
      },
    getRandomImage: function(count) {
        axios.defaults.withCredentials = true;
        return axios.get("https://picsum.photos/500/250");
      },
}