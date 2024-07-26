const nodemailer = require('nodemailer');
const { smtp } = require('../config/mail.config.js');

const transporter = nodemailer.createTransport(smtp);

const sendBatchEmails = async (emails) => {
  // Split emails into smaller batches to avoid overwhelming the server
  const batchSize = 50; // Adjust this based on your needs and limits
  const emailBatches = [];
  
  for (let i = 0; i < emails.length; i += batchSize) {
    emailBatches.push(emails.slice(i, i + batchSize));
  }
  
  for (const batch of emailBatches) {
    const sendPromises = batch.map(emailData =>
      transporter.sendMail({
        from: 'sender@example.com',
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.body,
      })
    );
    
    try {
      // Await the completion of the current batch
      await Promise.all(sendPromises);
    } catch (error) {
      console.error('Failed to send batch of emails:', error);
      // Implement retry logic or error handling here
    }
    
    // Optionally, add a delay between batches to avoid hitting rate limits
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
  }
};

module.exports = {
  sendBatchEmails,
};
