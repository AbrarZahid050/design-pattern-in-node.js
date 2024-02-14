const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  brokers: ["192.168.18.130:9092"],
  clientId: "IPC using message queue",
});
