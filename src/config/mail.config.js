import { createTransport } from 'nodemailer';
import env from './env.config.js';

const smtp = {
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD,
  },
};

const transporter = createTransport(smtp);
export { transporter };
