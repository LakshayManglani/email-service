const { Kafka } = require("kafkajs");

const kafka =  {
  clientId: 'email-service',
  brokers: [process.env.KAFKA_BROKER_URI],
}

const kafkaClient = new Kafka(kafka);

module.exports = {
  kafka,
  kafkaClient,
  topics: { 
    highPriorityEmails: 'high-priority-emails',
    lowPriorityEmails: 'low-priority-emails',
    errorHandlers: 'email-processing-errors',
  },
};
