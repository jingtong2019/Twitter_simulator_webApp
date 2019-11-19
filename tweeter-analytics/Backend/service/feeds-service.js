const Tweet = require("../models/tweet");
const mongoose = require("mongoose");

exports.getUserTweets = function(req, res) {
  console.log("In getUserTweet");
  Tweet.find({}, function(err, doc) {
    if (doc) {
      console.log("doc found");
      console.log(doc);
      res.send(doc);
    } else {
      console.log("NO doc found");
      console.log(err);
    }
  });
};
