const { Kafka } = require('kafkajs');
const { kafka, topics } = require('../config/kafka.config.js');

const kafkaClient = new Kafka(kafka);
const producer = kafkaClient.producer();

const runProducer = async () => {
  await producer.connect();
  console.log('Producer connected');

  // Example email request
  const emailRequest = { to: 'user@example.com', subject: 'Test Email', body: 'This is a test.' };

  await producer.send({
    topic: topics.highPriorityEmails,
    messages: [{ value: JSON.stringify(emailRequest) }],
  });

  console.log('Email request sent');
  await producer.disconnect();
};

module.exports = runProducer;