const { Kafka, Partitioners } = require('kafkajs');
const { faker } = require('@faker-js/faker'); // Import faker

const kafka = new Kafka({
  clientId: 'email-service',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const runProducer = async () => {
  await producer.connect();
  console.log('Producer connected');

  // Send messages with random data
  for (let i = 0; i < 2; i++) {
    try {
      // Generate random name, age, and email
      const name = faker.person.fullName();
      const email = faker.internet.email(); // Generate a random email address

      await producer.send({
        topic: 'high-priority-emails',
        messages: [
          {
            partition: 0,
            key: `key-${i}`, // Optional: Change key if needed
            value: JSON.stringify({ name, email, id: i + 1 }), // Include email in the message
          },
        ],
      });
    } catch (error) {
      console.error('Error sending email request:', error);
    }
  }

  await producer.disconnect();
  console.log('Producer disconnected');
};

runProducer().catch(console.error);
