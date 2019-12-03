const kafka = require("kafka-node");
const Producer = kafka.Producer;
const client = new kafka.KafkaClient();
const producer = new Producer(client);

let count = 0;
var producerReady = false;

producer.on("ready", function() {
  console.log("ready");
  producerReady = true;
//   setInterval(function() {
//     payloads = [
//       { topic: "grubhub-topic", messages: `I have ${count} cats`, partition: 0 }
//     ];

//     producer.send(payloads, function(err, data) {
//       console.log(data);
//       count += 1;
//     });
//   }, 5000);
});

producer.on("error", function(err) {
  console.log(err);
});

function produceMessage(topic, message, partition) {
    if (!produceMessage) return;
    var payloads = [
        { topic: topic, messages: message, partition: partition }
      ];
    producer.send(payloads, function(err, data) {
        if (err) {
            return err;
        } else {
            return data;
        }
    });
}

module.exports = produceMessage;