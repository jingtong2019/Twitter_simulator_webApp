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
  db = client.db("test");
});

exports.getTweetByDay2 = function(req, res) {
  var response = {};
  console.log("In getTweetByDay");
  db.collection("twitter")
    .aggregate([
      {
        $match: {
          $and: [
            { by: 2 },
            {
              date: {
                // 28 days ago (from now)
                $gte: new Date(Date.now() - 28 * 60 * 60 * 1000)
              }
            }
          ]
        }
      },
      { $sort: { date: 1 } },
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
        throw err;
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
      res.send(response);
    });
};

exports.getTweetByHour = function(req, res) {
  var response = {};
  console.log("In Hour");
  console.log(2);
  console.log(new Date(Date.now()));
  query = { $gt: new Date(Date.now() - 1 * 60 * 60 * 1000) };
  console.log(query);
  db.collection("twitter")
    .aggregate([
      {
        $match: {
          $and: [
            { by: 2 },
            {
              date: {
                // 60 minutes ago (from now)
                $gt: new Date(Date.now() - 1 * 60 * 60 * 1000)
              }
            }
          ]
        }
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
        throw err;
      }
      console.log(result);
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
      res.send(response);
    });
};

exports.getTweetByWeek = function(req, res) {
  var response = {};
  console.log("In getTweetByWeek");

  db.collection("twitter")
    .aggregate([
      {
        $match: {
          $and: [
            { by: 2 },
            {
              date: {
                // 7 days ago (from now)
                $gte: new Date(Date.now() - 7 * 60 * 60 * 1000)
              }
            }
          ]
        }
      },
      { $sort: { date: 1 } },
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
        throw err;
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
      res.send(response);
    });
};
