const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const http = require('http');
const highPriorityConsumer = require('./consumers/highPriority.consumer.js');
const lowPriorityConsumer = require('./consumers/lowPriority.consumer.js');
const errorConsumer = require('./consumers/error.consumer.js');
const runProducer = require("./consumers/producer.kafka.js")

// HTTP Server Setup (for optional admin or status endpoints)
const requestHandler = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Kafka consumer is running');
};

// Start HTTP Server
const server = http.createServer(requestHandler);

// Start Kafka Consumer
highPriorityConsumer().catch(err => {
  console.error('Error in high priority consumer : ', err);
});

lowPriorityConsumer().catch(err => {
  console.error('Error in low priority consumer : ', err);
});

runProducer().catch(err => {
  console.error('producer error : ', err);
})

errorConsumer().catch(err => {
  console.error('consumer error : ', err);
})

server.listen(process.env.PORT, () => {
  console.log(`🚝 Server is running at port ${process.env.PORT}`);
});
