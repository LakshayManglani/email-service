const { kafkaClient, topics } = require("../config/kafka.config");
const { sendBatchEmails } = require("../mail/mailService");


const lowPriorityConsumer = kafkaClient.consumer({ groupId: 'low-priority-group' });

const runLowPriorityConsumer = async () => {
  await lowPriorityConsumer.connect();
  await lowPriorityConsumer.subscribe({ topic: topics.lowPriorityEmails });

  await lowPriorityConsumer.run({
    eachBatch: async ({ batch }) => {
      const messages = batch.messages.map(message => JSON.parse(message.value.toString()));
      try {
        await sendBatchEmails(messages);  // Implement this function to send emails in batch
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

module.exports = runLowPriorityConsumer;