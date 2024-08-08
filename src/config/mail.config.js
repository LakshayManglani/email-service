import { createTransport } from 'nodemailer';
const smtp = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
};

const transporter = createTransport(smtp);

export { transporter };
