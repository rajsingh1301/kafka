import { kafka } from "./client.js";

async function init() {
  // Create an admin client to manage Kafka infrastructure (like creating topics)
  const admin = kafka.admin();
  
  console.log("Connecting to Kafka...");
  await admin.connect();
  console.log("Connected to Kafka");

  // Create a new topic named "rider-updates" with 2 partitions
  // Partitions allow the data in the topic to be split across multiple brokers
  // for horizontal scalability and parallel processing.
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  
  // Disconnect the admin client once the topic management is done
  await admin.disconnect();
  console.log("disconnecting admin ")
}

init().catch(console.error);
