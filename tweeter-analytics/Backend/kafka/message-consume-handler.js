const feedService = require("../service/feeds-service");
const producer = require("./producer");

module.exports = {
  resolveToAction: function(event) {
    var eventObj = JSON.parse(event);
    switch (eventObj.eventType) {
      case "getTopLikeTweet":
        console.log("dwqdwq" + eventObj);
        feedService.getTopLikeTweetKafka(eventObj.params.userId, function(
          err,
          doc
        ) {
          console.log("sendReply getTopLikeTweet");
          sendReply(eventObj, err, doc);
        });
        break;
      case "getTopViewTweet":
        feedService.getTopViewTweet(eventObj.params.userId, function(err, doc) {
          sendReply(eventObj, err, doc);
        });
        break;
      case "getTopRetweetTweet":
        feedService.getTopRetweetTweet(eventObj.params.userId, function(
          err,
          doc
        ) {
          sendReply(eventObj, err, doc);
        });
        break;
      case "getTweetByHour":
        feedService.getTweetByHour(eventObj.params.userId, function(err, doc) {
          sendReply(eventObj, err, doc);
        });
        break;
      case "getTweetByDay":
        feedService.getTweetByDay(eventObj.params.userId, function(err, doc) {
          sendReply(eventObj, err, doc);
        });
        break;
      case "getTweetByWeek":
        feedService.getTweetByWeek(eventObj.params.userId, function(err, doc) {
          sendReply(eventObj, err, doc);
        });
        break;
      default:
        console.log("invalid event type" + eventObj.eventType);
    }
  }
};

function sendReply(eventObj, err, doc) {
  if (err) {
    var message = JSON.stringify({
      correlationId: eventObj.correlationId,
      data: err,
      status: "error"
    });
  } else {
    var message = JSON.stringify({
      correlationId: eventObj.correlationId,
      data: doc,
      status: "success"
    });
  }

  producer.produceMessage(eventObj.replyTo, message, 0, function(err, resp) {
    if (err) {
      console.log(err);
    } else {
      console.log("produce to ui service success");
    }
  });
}
