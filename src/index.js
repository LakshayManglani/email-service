import './config/env.config.js';
import { kafka, topics } from './config/kafka.config.js';
import highPriorityConsumer from './consumers/highPriority.consumer.js';
import lowPriorityConsumer from './consumers/lowPriority.consumer.js';
import errorConsumer from './consumers/error.consumer.js';

async function kafkaInit() {
  const admin = kafka.admin();

  await admin.connect();
  console.log('Admin Connection Success...');

  const topicsToCreate = [
    {
      topic: topics.highPriorityEmails,
      numPartitions: 6,
    },
    {
      topic: topics.lowPriorityEmails,
      numPartitions: 4,
    },
    {
      topic: topics.errorHandlers,
      numPartitions: 2,
    },
  ];

  await admin.createTopics({ topics: topicsToCreate });
  console.log('Topics created successfully');

  console.log('Disconnecting Admin...');
  await admin.disconnect();
}

(async () => {
  await kafkaInit();

  await highPriorityConsumer();
  await lowPriorityConsumer();
  await errorConsumer();
})();
