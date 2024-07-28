const { Kafka } = require("kafkajs");


const kafka = new Kafka({
  clientId: 'email-service',
  brokers: [process.env.KAFKA_BROKER_URI],
});

module.exports = {
  kafka,
  topics: { 
    highPriorityEmails: 'high-priority-emails',
    lowPriorityEmails: 'low-priority-emails',
    errorHandlers: 'email-processing-errors',
  },
};

