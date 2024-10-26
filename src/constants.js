const Kafka = Object.freeze({
  TOPIC_NAME: 'email',
  NUM_PARTITIONS: 3,
  CONSUMER_GROUP_ID: 'email-group',
});

const RateLimit = Object.freeze({
  INITIAL_RATE_LIMIT: 5,
  RATE_LIMIT_RESET_INTERVAL_MS: 1000,
  MESSAGE_PROCESSING_DELAY_MS: 500,
});

export { Kafka, RateLimit };
