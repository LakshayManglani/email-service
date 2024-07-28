const { kafka, topics } = require("../config/kafka.config");
const {  sendMail } = require("../mail/mailService");


const lowPriorityConsumer = kafka.consumer({ groupId: 'low-priority-group' });

const runLowPriorityConsumer = async () => {
  await lowPriorityConsumer.connect();
  await lowPriorityConsumer.subscribe({ topic: topics.lowPriorityEmails });

  await lowPriorityConsumer.run({
    eachMessage: async ({ _, __, message }) => {
      try {
        // Convert the message value to an object
        const messageData = JSON.parse(message.value.toString());
        
        // Send the email using the converted object
        sendMail(messageData);

      } catch (error) {
        console.error('Error processing message:', error);
      }
    },
  });
};

module.exports = runLowPriorityConsumer;