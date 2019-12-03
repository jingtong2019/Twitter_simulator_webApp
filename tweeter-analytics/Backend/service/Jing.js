//db.twitter.insert({content: "CONTENT_OF_TWEET8", by: 2, hashtags: ["TAG1", "TAG2", "TAG3"],likes: [9, 10],num_likes: 24,retweets: 24,num_comments: 23,views: 24,tweet_type: "ORIGINAL",retweet_from: "null",date: new Date()})

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
module.exports = {
  secret: "Passphrase for encryption should be 45-50 char long",
  mongodb: "mongodb://localhost:27017",
  dbname: "LOCAL_DB_NAME",
  mongodb1: "mongodb://localhost:27017/LOCAL_DB_NAME",
  mongodb2:
    "mongodb://user1:user1password@ec2-52-53-158-214.us-west-1.compute.amazonaws.com:27017/mydb",
  mongodb3:
    "mongodb+srv://saitwitter:saitwitter@saiprithipa-cluster-fz95b.mongodb.net",
  dbname3: "saitwitter",
  dbsetting: { useNewUrlParser: true, poolSize: 10 },
  redisSetting: "off",
  kafka_address: "localhost:2181"
};
