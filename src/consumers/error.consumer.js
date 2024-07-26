const { kafkaClient, topics } = require("../config/kafka.config");

const errorConsumer = kafkaClient.consumer({ groupId: 'error-group' });

const runErrorConsumer = async () => {
  await errorConsumer.connect();
  await errorConsumer.subscribe({ topic: topics.errorHandlers });

  await errorConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const email = JSON.parse(message.value.toString());
      // Handle the error, e.g., log it or retry
      console.error('Failed to process email:', email);
    }
  });
};

module.exports = runErrorConsumer;