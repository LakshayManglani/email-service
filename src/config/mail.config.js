import { createTransport } from 'nodemailer';
import env from './env.config.js';

const transporter = createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  service: env.SMTP_SERVICE,
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD,
  },
});

export { transporter };
