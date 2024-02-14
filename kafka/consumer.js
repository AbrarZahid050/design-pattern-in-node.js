const { kafka } = require("./client");

const consume = async () => {
  const consumer = kafka.consumer({
    groupId: "user-1",
  });

  await consumer.connect();

  await consumer.subscribe({
    topics: ["node.js-process"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(`[${topic}] - [${partition}] - message: ${message.value}`);
    },
  });
};

consume();
