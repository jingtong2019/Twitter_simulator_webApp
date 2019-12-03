var connection = new require('./kafka/Connection');

//topics file
var signupLoginTopics = require('./services/signupLoginTopics.js');
var profileTopics = require('./services/profileTopics.js');
var messageTopics = require('./services/messageTopics.js');

function handleTopicRequest(topic_name, fname) {
    console.log("topic_name:", topic_name)
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    consumer.on('error', function (err) {
        console.log("Kafka Error: Consumer - " + err);
    });
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        switch (topic_name) {

            case 'signupLogin_Topics':
                signupLoginTopics.signupLoginService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'profile_Topics':
                profileTopics.profileService(data.data, function (err, res) {
                        response(data, res, producer);
                        return;
                    });
                    break;
            case 'message_Topics':
                messageTopics.messageService(data.data, function (err, res) {
                            response(data, res, producer);
                            return;
                            });
                            break;
            
        }
    })
};

function response(data, res, producer) {
    console.log('after handle', res);
    var payloads = [
        {
            topic: data.replyTo,
            messages: JSON.stringify({
                correlationId: data.correlationId,
                data: res
            }),
            partition: 0
        }
    ];
    producer.send(payloads, function (err, data) {
        console.log('producer send', data);
    });
    return;
}

handleTopicRequest("signupLogin_Topics", signupLoginTopics);
handleTopicRequest("profile_Topics", profileTopics);
handleTopicRequest("message_Topics", messageTopics);