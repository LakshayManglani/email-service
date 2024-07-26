const { kafkaClient, topics } = require("../config/kafka.config");

const highPriorityConsumer = kafkaClient.consumer({ groupId: 'high-priority-group' });

const runHighPriorityConsumer = async () => {
  await highPriorityConsumer.connect();
  await highPriorityConsumer.subscribe({ topic: topics.highPriorityEmails });

  await highPriorityConsumer.run({
    eachBatch: async ({ batch }) => {
      const messages = batch.messages.map(message => JSON.parse(message.value.toString()));
      try {
        console.log("high priority consumer running : ", batch)
        await sendBatchEmail(messages);  // Implement this function to send emails in batch
      } catch (error) {
        // On error, push failed messages to error topic
        await producer.send({
          topic: 'email-processing-errors',
          messages: messages.map(message => ({ value: JSON.stringify(message) }))
        });
      }
    }
  });
};

module.exports = runHighPriorityConsumer;