var kafka = require("../../kafka/client");
var TOPICS = require("../../kafka/topics");

module.exports = function(router) {
  router.get("/getTopLikeTweet", function(req, res) {
    console.log("USER???+ ");
    console.log(req.query);
    kafka.make_request(
      TOPICS.TWITTER_ANALYTICS_TOPIC,
      "getTopLikeTweet",
      req.query,
      req.body,
      function(err, doc) {
        if (err) {
          res.status(500).json({
            message: "Error getting tweets info",
            error: err
          });
        } else {
          console.log("HEJKHLEHJKLEHJKL");
          console.log(doc);
          res.status(200).json(doc);
        }
      }
    );
  });

  router.get("/getTopViewTweet", function(req, res) {
    console.log("USERView???++ ");
    console.log(req.query);
    kafka.make_request(
      TOPICS.TWITTER_ANALYTICS_TOPIC,
      "getTopViewTweet",
      req.query,
      req.body,
      function(err, doc) {
        if (err) {
          res.status(500).json({
            message: "Error getting followers for this user",
            error: err
          });
        } else {
          console.log("getTopViewTweet HEJKHLEHJKLEHJKL");
          console.log(doc);
          res.status(200).json(doc);
        }
      }
    );
  });

  router.get("/getTopRetweetTweet", function(req, res) {
    kafka.make_request(
      TOPICS.TWITTER_ANALYTICS_TOPIC,
      "getTopRetweetTweet",
      req.query,
      req.body,
      function(err, doc) {
        if (err) {
          res.status(500).json({
            message: "Error getting users followed by this user",
            error: err
          });
        } else {
          res.status(200).json(doc);
        }
      }
    );
  });
  //getTweetByHour getTopRetweetTweet
  router.get("/getTweetByHour", function(req, res) {
    console.log("In getTweetByHour ");
    kafka.make_request(
      TOPICS.TWITTER_ANALYTICS_TOPIC_TIME,
      "getTweetByHour",
      req.query,
      req.body,
      function(err, doc) {
        if (err) {
          res.status(500).json({
            message: "Error getting profile views for this user",
            error: err
          });
        } else {
          res.status(200).json(doc);
        }
      }
    );
  });

  router.get("/getTweetByDay", function(req, res) {
    kafka.make_request(
      TOPICS.TWITTER_ANALYTICS_TOPIC_TIME,
      "getTweetByDay",
      req.query,
      req.body,
      function(err, doc) {
        if (err) {
          res.status(500).json({
            message: "Error updating followers for this user",
            error: err
          });
        } else {
          res.status(200).json(doc);
        }
      }
    );
  });

  router.get("/getTweetByWeek", function(req, res) {
    kafka.make_request(
      TOPICS.TWITTER_ANALYTICS_TOPIC_TIME,
      "getTweetByWeek",
      req.query,
      req.body,
      function(err, doc) {
        if (err) {
          res.status(500).json({
            message: "Error getting followers for this user",
            error: err
          });
        } else {
          res.status(200).json(doc);
        }
      }
    );
  });
};
