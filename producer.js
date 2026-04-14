import { Partitioners } from "kafkajs";
import { kafka } from "./client.js";
import readline from "readline";

// This helps us read inputs from the terminal
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

async function init(params) {
  // producer is what we use to SEND messages to Kafka
  const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

  console.log("Connecting producer...");
  await producer.connect();
  console.log("Producer successfully connected!"); 
   
  rl.setPrompt("> ");
  rl.prompt();

  // Every time you type a line in the terminal and press Enter, this runs:
  rl.on("line", async function (line) {
    const parts = line.trim().split(/\s+/);
    const riderName = parts[0];
    const location = parts[1] || "";
    
    // We send the typed data as a message to the "rider-updates" topic
    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          // If the location is "north", send to partition 0. Otherwise, partition 1.
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "location-update",
          value: JSON.stringify({ name: riderName, location }),
        },
      ],
    });
  }).on('close', async () => {
    // When we close the terminal, disconnect the producer safely
    await producer.disconnect();
  });
}

init().catch(console.error);