var kafka = require("../../kafka/client");
var TOPICS = require("../../kafka/topics");

module.exports = function(router) {
  router.get("/getTopLikeTweet", function(req, res) {
    kafka.make_request(
      TOPICS.TWITTER_ANALYTICS_TOPIC,
      "getTopLikeTweet",
      req.params,
      req.body,
      function(err, doc) {
        if (err) {
          res.status(500).json({
            message: "Error getting tweets info",
            error: err
          });
        } else {
          res.status(200).json(doc);
        }
      }
    );
  });

  router.get("/getTopViewTweet", function(req, res) {
    kafka.make_request(
      TOPICS.TWITTER_ANALYTICS_TOPIC,
      "getTopViewTweet",
      req.params,
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

  router.get("/getTopRetweetTweet", function(req, res) {
    kafka.make_request(
      TOPICS.TWITTER_ANALYTICS_TOPIC,
      "getTopRetweetTweet",
      req.params,
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

  router.get("/getTweetByHour", function(req, res) {
    kafka.make_request(
      TOPICS.TWITTER_ANALYTICS_TOPIC,
      "getTweetByHour",
      req.params,
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
      TOPICS.TWITTER_ANALYTICS_TOPIC,
      "getTweetByDay",
      req.params,
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
      TOPICS.TWITTER_ANALYTICS_TOPIC,
      "getTweetByWeek",
      req.params,
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
