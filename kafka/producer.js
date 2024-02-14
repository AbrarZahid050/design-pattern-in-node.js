const { kafka } = require("./client");

const produce = async () => {
  const producer = kafka.producer();

  await producer.connect();

  const resFromProducer = await producer.send({
    topic: "node.js-process",
    messages: [
      {
        partition: 0,
        key: "node-says",
        value: "test",
      },
    ],
  });

  console.log("-> [producer.js] - [producer] ", resFromProducer);

  await producer.disconnect();
};

produce();
