import { kafka, topics } from '../config/kafka.config.js';
import { sendMail } from '../mail/mailService.js'; // Ensure this path is correct

const highPriorityConsumer = kafka.consumer({ groupId: 'high-priority-group' });

const runHighPriorityConsumer = async () => {
  await highPriorityConsumer.connect();
  await highPriorityConsumer.subscribe({ topic: topics.highPriorityEmails });

  await highPriorityConsumer.run({
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

export default runHighPriorityConsumer;
