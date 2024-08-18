import initializeKafkaTopic from './admin/topicManager.admin.js';
import { initializeKafkaConsumer } from './consumers/kafka.consumer.js';
import { processMessages } from './consumers/messageProcessor.consumer.js';

let consumer;

async function main() {
  try {
    await initializeKafkaTopic();
    consumer = await initializeKafkaConsumer();
    await processMessages(consumer);
  } catch (error) {
    console.error('Error running Kafka consumer:', error);
    process.exit(1);
  }
}

async function cleanup() {
  if (consumer) {
    await consumer.disconnect();
  }
}

process.on('SIGINT', async () => {
  console.log('SIGINT signal received.');
  await cleanup();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received.');
  await cleanup();
  process.exit(0);
});

main();
