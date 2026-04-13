import { kafka } from "./client.js";


async function init() {
  const admin = kafka.admin();
  console.log("Connecting to Kafka...");
  await admin.connect();
  console.log("Connected to Kafka");

  //creating topics

  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  await admin.disconnect();
  console.log("disconnecting admin ")
}

init().catch(console.error);
