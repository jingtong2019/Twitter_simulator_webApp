const kafka = require("kafka-node");
const config = require("./config");
const mcHandler = require("./message-consume-handler");

try {
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient(config.kafka_server);

  let consumer = new Consumer(client, getTopicsOption(), {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: "utf8",
    fromOffset: false
  });

  consumer.on("message", async function(message) {
    console.log("kafka-> ", message.value.eventType);
    mcHandler.resolveToAction(message.value);
  });

  consumer.on("error", function(err) {
    console.log("error", err);
  });
} catch (e) {
  console.log(e);
}

function getTopicsOption() {
  let topics = config.kafka_topic.split(",");
  let topicOptions = [];
  for (var topic of topics) {
    topicOptions.push({ topic: topic, partition: 0 });
  }
  return topicOptions;
}
