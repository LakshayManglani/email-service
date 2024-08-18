import { transporter } from '../config/mail.config.js';

/**
 * @description Function to send mail
 *
 * @param {{to: string, subject: string, text: string}} options
 */
async function sendMail(options) {
  try {
    await transporter.sendMail({
      from: 'devsync@gmail.com',
      to: options.to,
      subject: options.subject,
      text: options.text,
    });
  } catch (error) {
    console.error('Error sending mail', error);
  }
}

export { sendMail };