import { kafka } from '../config/kafka.config.js';
import { Kafka } from '../constants.js';

const { TOPIC_NAME, NUM_PARTITIONS } = Kafka;

export default async function initializeKafkaTopic() {
  const admin = kafka.admin();

  try {
    await admin.connect();
    const topics = await admin.listTopics();

    if (!topics.includes(TOPIC_NAME)) {
      await admin.createTopics({
        topics: [{ topic: TOPIC_NAME, numPartitions: NUM_PARTITIONS }],
      });
      console.log(
        `Topic ${TOPIC_NAME} created with ${NUM_PARTITIONS} partitions.`
      );
    } else {
      console.log(`Topic ${TOPIC_NAME} already exists.`);
    }
  } catch (error) {
    console.error('Error initializing Kafka topic:', error);
    process.exit(1);
  } finally {
    await admin.disconnect();
  }
}
