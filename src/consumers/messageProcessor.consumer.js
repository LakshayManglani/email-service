import { sendMail } from '../mail/index.js';
import { Kafka, RateLimit } from '../constants.js';
import templates from '../mail/templates/index.js';

// Configuration constants
const {
  INITIAL_RATE_LIMIT,
  RATE_LIMIT_RESET_INTERVAL_MS,
  MESSAGE_PROCESSING_DELAY_MS,
} = RateLimit;

const { NUM_PARTITIONS, TOPIC_NAME } = Kafka;

// Internal state
const messageBuffer = Array.from(new Array(NUM_PARTITIONS), () => []);
let rateLimit = INITIAL_RATE_LIMIT;
let isProcessingMessages = false;

/**
 * Resets the rate limit at regular intervals.
 */
function resetRateLimit() {
  setInterval(() => {
    rateLimit = INITIAL_RATE_LIMIT;
  }, RATE_LIMIT_RESET_INTERVAL_MS);
}
resetRateLimit();

async function listenForMessages(consumer) {
  console.log('Listening for messages from kafka...');
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ message, partition }) => {
      messageBuffer[partition].push(message);
      console.log(`Message added to partition ${partition}`);
    },
  });
}

/**
 *
 * @param {KafkaConsumer} consumer
 */
async function processMessages(consumer) {
  listenForMessages(consumer);

  setInterval(async () => {
    if (isProcessingMessages) return;

    isProcessingMessages = true;

    try {
      await processPartitions(consumer);
    } finally {
      isProcessingMessages = false;
    }
  }, MESSAGE_PROCESSING_DELAY_MS);
}

/**
 * Processes messages for each partition.
 * @param {KafkaConsumer} consumer
 */
async function processPartitions(consumer) {
  let partitionIndex = 0;
  while (partitionIndex < NUM_PARTITIONS) {
    const partitionMessages = messageBuffer[partitionIndex];
    while (partitionMessages.length > 0) {
      if (rateLimit <= 0) {
        console.log('Rate limit exceeded. time', new Date());
        await delay(MESSAGE_PROCESSING_DELAY_MS);
      }

      const messagesChunk = partitionMessages.splice(0, rateLimit);
      rateLimit -= messagesChunk.length;

      console.log(
        '\n----------- Processing partition',
        partitionIndex,
        'time',
        new Date()
      );
      Promise.all(
        messagesChunk.map((message) =>
          handleMessage(consumer, message, partitionIndex)
        )
      );

      const newMessagesIndex =
        newPriorityMessagesPartitionIndex(partitionIndex);

      if (newMessagesIndex >= 0) {
        partitionIndex = newMessagesIndex - 1;
        break;
      }
    }

    partitionIndex++;
  }
}

/**
 * Handles individual messages.
 * @param {KafkaConsumer} consumer
 * @param {Object} message
 * @param {number} partitionIndex
 */
async function handleMessage(consumer, message, partitionIndex) {
  const messageValue = message.value.toString();
  const parsedMessage = JSON.parse(messageValue);

  const { subject, text, html } = templates[parsedMessage.type](
    parsedMessage.data
  );

  if (!subject || !(text || html)) {
    console.error(
      'Invalid email template for message type',
      parsedMessage.type
    );
    return;
  }

  console.log(
    'Sending email for partition',
    partitionIndex,
    'and offset',
    message.offset,
    'id',
    parsedMessage.id
  );

  await sendMail({ subject, text, to: parsedMessage.data.to, html });

  await consumer.commitOffsets([
    {
      offset: (parseInt(message.offset, 10) + 1).toString(),
      partition: partitionIndex,
      topic: TOPIC_NAME,
    },
  ]);
}

function newPriorityMessagesPartitionIndex(currentPartitionIndex) {
  for (let i = 0; i < currentPartitionIndex; i++) {
    if (messageBuffer[i].length) {
      return i;
    }
  }

  return -1;
}

/**
 * Delays execution for a given amount of time.
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise} - A promise that resolves after the delay.
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { processMessages };
