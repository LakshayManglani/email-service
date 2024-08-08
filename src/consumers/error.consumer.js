import { kafka, topics } from '../config/kafka.config.js';

const errorConsumer = kafka.consumer({ groupId: 'error-group' });

const runErrorConsumer = async () => {
  await errorConsumer.connect();
  await errorConsumer.subscribe({ topic: topics.errorHandlers });

  await errorConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const email = JSON.parse(message.value.toString());
      // Handle the error, e.g., log it or retry
      console.error('Failed to process email:', email);
    },
  });
};

export default runErrorConsumer;
