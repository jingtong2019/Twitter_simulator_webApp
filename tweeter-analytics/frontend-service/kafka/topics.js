module.exports = {
  TWITTER_ANALYTICS_TOPIC: {
    name: "twitter-analytics-topic", // requests - backend listens to this
    mappedTo: "twitter-analytics-topic-reply" // response - frontend (this code) listens to
  },
  TWITTER_ANALYTICS_TOPIC_TIME: {
    name: "twitter-analytics-topic-time", // requests - backend listens to this
    mappedTo: "twitter-analytics-topic-time-reply" // response - frontend (this code) listens to
  }
};
