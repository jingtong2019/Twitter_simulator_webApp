// const Tweet = require("../models/tweet");
// const mongoose = require("mongoose");

var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
// connect string for mongodb server running locally, connecting to a database called test
var url = "mongodb://127.0.0.1:27017";
const dbName = "test";
var mongodb;
const options1 = {
  useUnifiedTopology: true
};

exports.getTopLikeTweet = function(req, res) {
  console.log("In getUserTweet");

  MongoClient.connect(url, options1, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to MongoDB server.");
    const db = client.db(dbName);
    mongodb = db;
    db.collection("twitter")
      .aggregate([
        { $match: { by: 1 } },
        { $project: { _id: 1, num_likes: 1 } },
        { $limit: 5 }
      ])
      .sort({ num_likes: -1 })
      .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        //db.close();
      });
  });
};
// exports.getUserTweets2 = function(userId, callback) {
//   Tweet.find()
//     .exec()
//     .then(docs => {
//       callback(null, docs);
//     })
//     .catch(err => {
//       callback(err, null);
//     });
// };
// exports.getChatRoom = function(req, res) {
//   Tweet.find({}, function(err, doc) {
//     if (doc) {
//       console.log("doc found");
//       console.log(doc);
//       res.send(doc);
//     } else {
//       console.log("NO doc found");
//       console.log(err);
//     }
//   });
// };
