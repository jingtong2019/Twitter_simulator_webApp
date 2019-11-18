const feedService = require('../service/feeds-service');
const producer = require('./producer');

module.exports = {
    resolveToAction: function(event) {
        var eventObj = JSON.parse(event);
        switch(eventObj.eventType) {
            case 'get-user-feeds':
                feedService.getUserByUserId(eventObj.params.userId, function(err, doc) {
                    sendReply(eventObj, err, doc);
                });
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