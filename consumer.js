import { kafka } from "./client.js";

// Determine the consumer group ID from command line arguments, defaulting to "user-1"
const group = process.argv[2] || "user-1";

async function init() {
  // Create a consumer instance. A consumer group ID is mandatory.
  // Consumers in the same group balance the load by each reading from different partitions.
  const consumer = kafka.consumer({ groupId: group });
  
  await consumer.connect();

  // Subscribe to the "rider-updates" topic.
  // fromBeginning: true means it will read all past messages if it's the first time 
  // this consumer group is connecting to the topic.
  await consumer.subscribe({ 
    topics: ["rider-updates"], 
    fromBeginning: true 
  });

  // Start processing incoming messages from the topic
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      // Log the group ID, topic name, partition number, and the message content
      console.log(
        `${group}: [${topic}]: PART:${partition}:`,
        message.value.toString()
      );
    },
  });
}

init();