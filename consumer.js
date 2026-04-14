import { kafka } from "./client.js";

// Grab the group name you type in the terminal, or use "user-1" by default
const group = process.argv[2] || "user-1";

async function init() {
  // consumer is what we use to READ messages from Kafka
  // Kafka requires every consumer to belong to a group
  const consumer = kafka.consumer({ groupId: group });
  
  await consumer.connect();

  // Tell the consumer to subscribe (listen) to the "rider-updates" topic
  // fromBeginning means it will read all old messages first
  await consumer.subscribe({ 
    topics: ["rider-updates"], 
    fromBeginning: true 
  });

  // Start reading new messages as they come in
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Print out the message details to our terminal!
      console.log(
        `${group}: [${topic}]: PART:${partition}:`,
        message.value.toString()
      );
    },
  });
}

init().catch(console.error);