const kafka = require("kafka-node");
const Producer = kafka.Producer;
const client = new kafka.KafkaClient();
const producer = new Producer(client);

let count = 0;
var producerReady = false;

producer.on("ready", function() {
  console.log("ready");
  producerReady = true;
});

producer.on("error", function(err) {
  console.log(err);
});

module.exports = {
  produceMessage: function(topic, message, partition, callback) {
    if (!producerReady) return;
    var payloads = [{ topic: topic, messages: message, partition: partition }];
    console.info("payloads Kafka: ", payloads);

    producer.send(payloads, function(err, payload) {
      console.info("Sent payload to Kafka: ", payloads);
      console.info(payload);
      console.info("err message to Kafka: ", err);
      if (err) {
        callback(err, null);
      } else {
        callback(null, payload);
      }
    });
  }
};
