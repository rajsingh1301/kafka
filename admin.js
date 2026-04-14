import { kafka } from "./client.js";

async function init() {
  // admin helps us create and manage topics (like folders to store messages)
  const admin = kafka.admin();
  
  console.log("Connecting admin to Kafka...");
  await admin.connect();
  console.log("Admin connected!");

  // Here we are creating a new topic called "rider-updates"
  // We divide it into 2 partitions (chunks) so it can handle more work at once
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  
  // We are done setting things up, so we disconnect
  await admin.disconnect();
  console.log("Admin disconnected");
}

init().catch(console.error);
