import { Kafka } from "kafkajs";

// We set up our connection to Kafka here.
// 'clientId' is just the name of our app.
// 'brokers' tells the app where Kafka is running (which is usually localhost:9092)
export const kafka = new Kafka({
  clientId: "my-app",
  brokers: ['localhost:9092'],
});