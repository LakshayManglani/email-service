const dotenv = require('dotenv');
dotenv.config({
  path: './.env',
});
const { kafka, topics } = require('./config/kafka.config.js');
const highPriorityConsumer = require('./consumers/highPriority.consumer.js');
const lowPriorityConsumer = require('./consumers/lowPriority.consumer.js');
const errorConsumer = require('./consumers/error.consumer.js');

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
