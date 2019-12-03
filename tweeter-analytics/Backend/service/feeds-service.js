var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");

// connect string for mongodb server running locally, connecting to a database called test
var url =
  // "mongodb://user1:user1password@ec2-52-53-158-214.us-west-1.compute.amazonaws.com:27017/mydb";
  "mongodb://127.0.0.1:27017";
// const dbName = "test";
const options1 = {
  useUnifiedTopology: true
};
var db;
MongoClient.connect(url, options1, function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to MongoDB server.");
  db = client.db("mydb");
});

exports.getTopLikeTweetKafka = function(userId, callback) {
  console.log("In getTopLikeTweetKafka");
  console.log(userId);
  var response = {};

  db.collection("twitter")
    .aggregate([
      { $match: { by: parseInt(userId) } },
      { $project: { _id: 1, num_likes: 1 } },
      { $sort: { num_likes: -1 } },
      { $limit: 10 }
    ])

    .toArray(function(err, result) {
      if (err) {
        console.log("Error getTopLikeTweetKafka");
        console.log(err);
        callback(err, null);
      }
      let a = {};
      let top10Likes = [];
      let top10LikesNum = [];
      for (let i = 0; i < result.length; i++) {
        top10Likes.push(result[i]._id);
        top10LikesNum.push(result[i].num_likes);
      }
      a["_id"] = top10Likes;
      a["num_likes"] = top10LikesNum;
      console.log("here getTopLikeTweetKafka");
      console.log(a);
      response.code = "200";
      response.value = "Successfully find messages";
      response.result = a;
      callback(null, response);
    });
};

exports.getTopViewTweet = function(userId, callback) {
  var response = {};
  console.log("In view");
  console.log(userId);
  db.collection("twitter")
    .aggregate([
      { $match: { by: parseInt(userId) } },
      { $project: { _id: 1, views: 1 } },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ])
    .toArray(function(err, result) {
      if (err) {
        console.log(err);
        callback(err, null);
      }
      let a = {};
      let top10Views = [];
      let top10ViewsNum = [];
      for (let i = 0; i < result.length; i++) {
        top10Views.push(result[i]._id);
        top10ViewsNum.push(result[i].views);
      }
      a["_id"] = top10Views;
      a["views"] = top10ViewsNum;
      console.log("in review auserId");
      console.log(a);
      response.code = "200";
      response.value = "Successfully find messages view";
      response.result = a;
      callback(null, response);
    });
};
exports.getTopRetweetTweet = function(userId, callback) {
  var response = {};
  console.log("In getUserTweet");
  db.collection("twitter")
    .aggregate([
      { $match: { by: parseInt(userId) } },
      { $project: { _id: 1, retweets: 1 } },
      { $sort: { retweets: -1 } },
      { $limit: 5 }
    ])
    .toArray(function(err, result) {
      if (err) throw err;
      let a = {};
      let top5Retweets = [];
      let top5RetweetsNum = [];
      for (let i = 0; i < result.length; i++) {
        top5Retweets.push(result[i]._id);
        top5RetweetsNum.push(result[i].retweets);
      }
      a["_id"] = top5Retweets;
      a["retweets"] = top5RetweetsNum;
      response.code = "200";
      response.value = "Successfully find messages";
      response.result = a;
      callback(null, response);
    });
};

exports.getTweetByHour = function(userId, callback) {
  var response = {};
  console.log("In Hour");
  console.log(userId);
  query = {
    date: {
      // 60 minutes ago (from now)
      $gt: new Date(ISODate().getTime() - 1000 * 60 * 60)
    }
  };
  db.collection("twitter")
    .aggregate([
      {
        $match: { query }
      },
      {
        $project: {
          h: {
            $hour: {
              date: "$date",
              timezone: "America/Los_Angeles"
            }
          }
        }
      },
      { $sort: { date: 1 } },
      {
        $group: {
          _id: { hour: "$h" },
          total: { $sum: 1 }
        }
      }
    ])
    .toArray(function(err, result) {
      if (err) {
        console.log("get hour error");
        console.log(err);
        callback(err, null);
      }
      let a = {};
      let hourOfDay = [];
      let value = [];
      for (let i = 0; i < result.length; i++) {
        hourOfDay.push(result[i]._id.hour);
        value.push(result[i].total);
      }
      a["hourOfDay"] = hourOfDay;
      a["value"] = value;
      console.log("hourofDAY");
      console.log(a);
      response.code = "200";
      response.value = "Successfully find messages";
      response.result = a;
      callback(null, response);
    });
};

exports.getTweetByWeek = function(userId, callback) {
  var response = {};
  console.log("In getTweetByWeek");
  db.collection("twitter")
    .aggregate([
      {
        $match: { by: parseInt(userId) }
      },
      {
        $project: {
          w: {
            $dayOfWeek: {
              date: "$date",
              timezone: "America/Los_Angeles"
            }
          }
        }
      },

      {
        $group: {
          _id: { dayOfWeek: "$w" },
          total: { $sum: 1 }
        }
      }
    ])
    .toArray(function(err, result) {
      if (err) {
        console.log(err);
        callback(err, null);
      }
      let a = {};
      let dayOfWeek = [];
      let value = [];
      for (let i = 0; i < result.length; i++) {
        dayOfWeek.push(result[i]._id.dayOfWeek);
        value.push(result[i].total);
      }
      a["dayOfWeek"] = dayOfWeek;
      a["value"] = value;
      response.code = "200";
      response.value = "Successfully find messages";
      response.result = a;
      callback(null, response);
    });
};

exports.getTweetByDay = function(userId, callback) {
  var response = {};
  console.log("In getTweetByDay");
  db.collection("twitter")
    .aggregate([
      {
        $match: { by: parseInt(userId) }
      },
      {
        $project: {
          d: {
            $dayOfMonth: {
              date: "$date",
              timezone: "America/Los_Angeles"
            }
          }
        }
      },

      {
        $group: {
          _id: { dayOfMonth: "$d" },
          total: { $sum: 1 }
        }
      }
    ])
    .toArray(function(err, result) {
      if (err) {
        console.log("Error getTopLikeTweetKafka");
        console.log(err);
        callback(err, null);
      }
      let a = {};
      let dayOfMonth = [];
      let value = [];
      for (let i = 0; i < result.length; i++) {
        dayOfMonth.push(result[i]._id.dayOfMonth);
        value.push(result[i].total);
      }
      a["dayOfMonth"] = dayOfMonth;
      a["value"] = value;
      response.code = "200";
      response.value = "Successfully find messages";
      response.result = a;
      callback(null, response);
    });
};
