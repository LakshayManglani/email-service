import { Kafka } from 'kafkajs';
import env from './env.config.js';

const kafka = new Kafka({
  clientId: env.KAFKA_CLIENT_ID,
  brokers: env.KAFKA_BROKERS_URI,
});

export { kafka };
