var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
// connect string for mongodb server running locally, connecting to a database called test
var url = "mongodb://127.0.0.1:27017";
const dbName = "test";
const options1 = {
  useUnifiedTopology: true
};
var db;
MongoClient.connect(url, options1, function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to MongoDB server.");
  db = client.db(dbName);
});

// exports.getTopLikeTweet2 = function(req, callback) {
//   console.log("In like");
//   var userId = req.query.userId;
//   var response = {};
//   db.collection("twitter")
//     .aggregate([
//       { $match: { by: userId } },
//       { $project: { _id: 1, num_likes: 1 } },
//       { $limit: 10 }
//     ])
//     .sort({ num_likes: -1 })
//     .toArray(function(err, result) {
//       if (err) {
//         callback(err, null);
//       }
//       let a = {};
//       let top10Likes = [];
//       let top10LikesNum = [];
//       for (let i = 0; i < result.length; i++) {
//         top10Likes.push(result[i]._id);
//         top10LikesNum.push(result[i].num_likes);
//       }
//       a["_id"] = top10Likes;
//       a["num_likes"] = top10LikesNum;
//       console.log("here");
//       console.log(a);
//       // res.send(a);
//       response.code = "200";
//       response.value = "Successfully find messages";
//       response.result = a;
//       callback(null, response);
//     });
// };

exports.getTopLikeTweet = function(req, res) {
  console.log("In like");
  var userId = req.query.userId;
  var response = {};
  db.collection("twitter")
    .aggregate([
      { $match: { by: 2 } },
      { $project: { _id: 1, num_likes: 1 } },
      { $sort: { num_likes: -1 } },
      { $limit: 10 }
    ])

    .toArray(function(err, result) {
      if (err) {
        throw err;
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
      console.log("here");
      console.log(a);
      res.send(a);
    });
};

exports.getTopViewTweet = function(req, res) {
  console.log("In view");
  var userId = req.query.userId;
  console.log(userId);
  db.collection("twitter")
    // .sort({ views: -1 })
    .aggregate([
      { $match: { by: 2 } },
      { $project: { _id: 1, views: 1 } },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ])
    .toArray(function(err, result) {
      if (err) throw err;
      let a = {};
      let top10Views = [];
      let top10ViewsNum = [];
      for (let i = 0; i < result.length; i++) {
        top10Views.push(result[i]._id);
        top10ViewsNum.push(result[i].views);
      }
      a["_id"] = top10Views;
      a["views"] = top10ViewsNum;

      console.log(a);
      res.send(a);
      //db.close();
    });
};
exports.getTopRetweetTweet = function(req, res) {
  console.log("In getUserTweet");
  db.collection("twitter")
    .aggregate([
      { $match: { by: 2 } },
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
      console.log(a);
      res.send(a);
      //db.close();
    });
};

exports.getTweetByHour = function(req, res) {
  console.log("In getTweetByPeriod");
  db.collection("twitter")
    .aggregate([
      {
        $match: { by: 2 }
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

      {
        $group: {
          _id: { hour: "$h" },
          total: { $sum: 1 }
        }
      }
    ])

    .toArray(function(err, result) {
      if (err) throw err;
      let a = {};
      let hourOfDay = [];
      let value = [];
      for (let i = 0; i < result.length; i++) {
        hourOfDay.push(result[i]._id.hour);
        value.push(result[i].total);
      }
      a["hourOfDay"] = hourOfDay;
      a["value"] = value;
      console.log(a);
      res.send(a);
      //db.close();
    });
};

exports.getTweetByWeek = function(req, res) {
  console.log("In getTweetByPeriod");
  db.collection("twitter")
    .aggregate([
      {
        $match: { by: 2 }
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
      if (err) throw err;
      let a = {};
      let dayOfWeek = [];
      let value = [];
      for (let i = 0; i < result.length; i++) {
        dayOfWeek.push(result[i]._id.dayOfWeek);
        value.push(result[i].total);
      }
      a["dayOfWeek"] = dayOfWeek;
      a["value"] = value;
      console.log(a);
      res.send(a);
    });
};

exports.getTweetByDay = function(req, res) {
  console.log("In getTweetByPeriod");
  db.collection("twitter")
    .aggregate([
      {
        $match: { by: 2 }
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
      if (err) throw err;
      let a = {};
      let dayOfMonth = [];
      let value = [];
      for (let i = 0; i < result.length; i++) {
        dayOfMonth.push(result[i]._id.dayOfMonth);
        value.push(result[i].total);
      }
      a["dayOfMonth"] = dayOfMonth;
      a["value"] = value;
      console.log(a);
      res.send(a);
    });
};
