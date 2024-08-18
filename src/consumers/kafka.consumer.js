import { kafka } from '../config/kafka.config.js';
import { Kafka } from '../constants.js';

const { TOPIC_NAME, CONSUMER_GROUP_ID } = Kafka;

export async function initializeKafkaConsumer() {
  const consumer = kafka.consumer({ groupId: CONSUMER_GROUP_ID });
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
  return consumer;
}
