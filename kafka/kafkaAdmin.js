const { kafka } = require("./client");

const init = async () => {
  const admin = kafka.admin();
  await admin.connect();

  try {
    const topicCreated = await admin.createTopics({
      topics: [
        {
          topic: "node.js-process",
          numPartitions: 2,
        },
      ],
    });
    console.log(
      topicCreated
        ? "-> [kafkaAdmin.js] - [init] Topic created."
        : "-> [kafkaAdmin.js] - [init] uable to create topic."
    );

    await admin.disconnect();
  } catch (err) {
    console.error(err);
  }
};

init();
