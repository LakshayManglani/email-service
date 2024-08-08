import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'email-service',
  brokers: [process.env.KAFKA_BROKER_URI],
});

const topics = {
  highPriorityEmails: 'high-priority-emails',
  lowPriorityEmails: 'low-priority-emails',
  errorHandlers: 'email-processing-errors',
};

export { kafka, topics };
