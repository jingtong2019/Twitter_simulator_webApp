db.twitter.insert({“content" : "CONTENT_OF_TWEET8", "by" : 1, "hashtags" : ["TAG1", "TAG2", "TAG3"], "likes" : [9, 10], "num_likes" : 2, "retweets" : 0, "num_comments" : 0, "views" : 1, "tweet_type" : "ORIGINAL", "retweet_from" : "null", "date": myDate} )

var MongoClient = require("mongodb").MongoClient;

var config = require("../config/settings");
var ObjectId = require("mongodb").ObjectID;
const { redisClient } = require("../redisClient");
var mydb;

// Initialize connection once
MongoClient.connect(config.mongodb, config.dbsetting, function(err, database) {
  if (err) throw err;
  mydb = database; //console.log('mydb=========', mydb);
});

function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("redis is ", config.redisSetting);
  var response = {};
  let tweet = mydb.collection("tweet");
  let follower = mydb.collection("follower");
  if (config.redisSetting === "on") {
    let redisKey = "getUserTweet" + msg.userid;
    redisClient.get(redisKey, async function(err, result) {
      if (!err && result != null) {
        console.log("---------Data found in cache");
        response.code = "200";
        response.value = "Successfully find messages";
        response.result = result;
        callback(null, response);
      } else {
        follower
          .find({ userid: msg.userid }, { "following.userid": 1, _id: 0 })
          .toArray(function(err, result) {
            if (!err) {
              let following = [];
              for (let i = 0; i < result[0].following.length; i++) {
                following.push(result[0].following[i].userid);
              }
              tweet
                .find({ by: { $in: following } })
                .sort({ date: -1 })
                .toArray(function(err, result) {
                  if (!err) {
                    redisClient.set(redisKey, JSON.stringify(result), function(
                      error,
                      reply
                    ) {
                      if (error) {
                        console.log(error);
                      }
                    });
                    response.code = "200";
                    response.value = "Successfully find messages";
                    response.result = result;
                    redisClient.expire(redisKey, 3000000);
                    callback(null, response);
                  }
                });
            }
          });
      }
    });
  } else {
    follower
      .find({ userid: msg.userid }, { "following.userid": 1, _id: 0 })
      .toArray(function(err, result) {
        if (!err) {
          let following = [];
          for (let i = 0; i < result[0].following.length; i++) {
            following.push(result[0].following[i].userid);
          } //console.log(following);
          tweet
            .find({ by: { $in: following } })
            .sort({ date: -1 })
            .toArray(function(err, result) {
              if (!err) {
                //console.log("result -----------", result);
                response.code = "200";
                response.value = "Successfully find messages";
                response.result = result;
                callback(null, response);
              }
            });
        }
      });
  }
}

exports.handle_request = handle_request;
