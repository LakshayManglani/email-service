import { config } from 'dotenv';

config({ path: './.env' });

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',

  KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || 'email-service',
  KAFKA_BROKERS_URI: process.env.KAFKA_BROKERS_URI.split(','),

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: parseInt(process.env.SMTP_PORT, 10),
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};

export default env;
