var kafka = require('kafka-node');
const appConfig = require('../config/main')

function ConnectionProvider() {
    this.getConsumer = function(topic_name) {
        // if (!this.kafkaConsumerConnection) {

            this.client = new kafka.KafkaClient("localhost:2181");
            /*this.client.refreshMetadata([{topic: topic_name}], (err) => {
                if (err) {
                    console.warn('Error refreshing kafka metadata', err);
                }
            });*/
            // this.kafkaConsumerConnection = new kafka.Consumer(this.client,[ { topic: topic_name, partition: 0 }]);
            this.kafkaConsumerConnection = new kafka.Consumer(this.client,getTopicsOption());
            this.client.on('ready', function () { console.log('client ready!') })
        // }
        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function() {

        if (!this.kafkaProducerConnection) {
            this.client = new kafka.KafkaClient("localhost:2181");
            /*this.client.refreshMetadata([{topic: topic_name}], (err) => {
                if (err) {
                    console.warn('Error refreshing kafka metadata', err);
                }
            });*/
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            console.log('producer ready');
        }
        return this.kafkaProducerConnection;
    };
}

function getTopicsOption() {
    let topics = appConfig.consumerTopics.split(',');
    let topicOptions = [];
    for (var topic of topics) {
      topicOptions.push({ topic: topic, partition: 0});
    }
    return topicOptions;
  }

exports = module.exports = new ConnectionProvider;