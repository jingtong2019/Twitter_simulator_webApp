const feedService = require('../service/feeds_service');
const feedActionService = require('../service/feed_action_service');
const producer = require('./producer');

module.exports = {
    resolveToAction: function(event) {
        var eventObj = JSON.parse(event);
        switch(eventObj.eventType) {
            case 'get-user-feeds':
                feedService.getUserFeeds(eventObj.params.userId, eventObj.params.pageNumber, function(err, doc) {
                    sendReply(eventObj, err, doc);
                });
                break;
            case 'get-user-followers':
                feedService.getUserFollowers(eventObj.params.userId, function(err, doc) {
                    sendReply(eventObj, err, doc);
                });
                break;
            case 'get-user-following':
                feedService.getUsersFollowing(eventObj.params.userId, function(err, doc) {
                    sendReply(eventObj, err, doc);
                });
                break;
            case 'update-user-followers':
                feedService.updateUserFollowers(eventObj.params.userId, eventObj.params.followerId, function(err, doc) {
                    sendReply(eventObj, err, doc);
                });
                break;
            case 'get-profile-views':
                feedService.getProfileViews(eventObj.params.userId, eventObj.params.duration, function(err, doc) {
                    sendReply(eventObj, err, doc);
                });
                break;
            case 'block-user-following':
                feedActionService.blockFollowing(eventObj.params.userId, eventObj.params.followingUserId, function(err, doc) {
                    sendReply(eventObj, err, doc);
                });
                break;
            case 'mute-user-following':
                feedActionService.muteFollowing(eventObj.params.userId, eventObj.params.muteUserId, function(err, doc) {
                    sendReply(eventObj, err, doc);
                });
                break;
            case 'like-tweet':
                feedActionService.likeTweet(eventObj.params.userId, eventObj.params.tweetId, function(err, doc) {
                    sendReply(eventObj, err, doc);
                });
                break;
            case 'unlike-tweet':
                feedActionService.unlikeTweet(eventObj.params.userId, eventObj.params.tweetId, function(err, doc) {
                    sendReply(eventObj, err, doc);
                });
                break;
            case 're-tweet':
                feedActionService.reTweet(eventObj.params.userId, eventObj.params.tweetId, function(err, doc) {
                    sendReply(eventObj, err, doc);
                });
                break;
            case 'replyto-Tweet':
                feedActionService.replyToTweet(eventObj.params.userId, eventObj.params.tweetId, eventObj.data.content, eventObj.data.userImage, function(err, doc) {
                    sendReply(eventObj, err, doc);
                });
                break;
            case 'get-tweet-byId':
                feedActionService.getTweetById(eventObj.params.tweetId, function(err, doc) {
                    sendReply(eventObj, err, doc);
                });
                break;
            default:
                console.log('invalid event type');
        }
    }
};

function sendReply(eventObj, err, doc) {

    if (err) {
        var message = JSON.stringify({
            correlationId:eventObj.correlationId,
            data:err,
            status: 'error'
        });
    } else {
        var message = JSON.stringify({
            correlationId:eventObj.correlationId,
            data:doc,
            status: 'success'
        });
    }

    producer.produceMessage(eventObj.replyTo, message, 0, function(err, resp) {
        if (err) {
            console.log(err);
        } else {
            console.log('produce to ui service success');
        }
    });
}