import { Kafka } from "kafkajs";

// Create a new Kafka client instance.
// clientId: A unique identifier for the client in the cluster.
// brokers: An array of seed brokers used to establish the initial connection.
export const kafka = new Kafka({
  clientId: "my-app",
  brokers: ['localhost:9092'],
});