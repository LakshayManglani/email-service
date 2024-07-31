const nodemailer = require('nodemailer');
const smtp = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
}

const transporter = nodemailer.createTransport(smtp);

module.exports = { transporter }