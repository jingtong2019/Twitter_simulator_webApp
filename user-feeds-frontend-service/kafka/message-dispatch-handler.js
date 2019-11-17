const producer = require('./producer');

const topic = 'grubhub-topic';
const partition = 0;

module.exports = {
    sendEvent: function(event) {
        switch(event.type) {
            case 'upload-image':
                producer.produceMessage(topic, event, partition);
                break;
            case 'login-user':
                producer.produceMessage(topic, event, partition);
                break;
            default:
                console.log('invalid event type');
        }
    }
};