import { kafka } from "./client.js";

async function init(params) {
  // Create a producer instance to publish messages to Kafka topics
  const producer = kafka.producer();
  
  console.log("connecting producer");
  await producer.connect();
  console.log("connected to kafka");
  
  // Send a message to the "rider-updates" topic
  // The 'key' ensures that messages with the same key always go to the same partition
  // The 'value' contains the actual stringified payload of the message
  await producer.send({
      partition: 0, // Optionally force the message into a specific partition
      topic: "rider-updates",
      messages: [
          { 
              key: 'location-update', 
              value: JSON.stringify({ name: "ramesh", loc: "lucknow" }) 
          },
      ],
  });
  
  // Clean up and disconnect the producer
  await producer.disconnect();
}

init().catch(console.error);