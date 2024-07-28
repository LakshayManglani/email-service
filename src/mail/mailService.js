const {transporter} = require('../config/mail.config.js');

const sendMail = async (data) => {
  try {
    await transporter.sendMail({
      from: 'jayash@gmail.com',
      to: data.email,
      subject: 'TESTING EMAIL',
      text: `Hello ${data.name}, this is a test email.`,
    });
    console.log(`Email No. ${data.id} sent successfully to ${data.email}`);
  } catch (error) {
    console.error(`Failed to send email No. ${data.id} to ${data.email}:`, error);
  }
};

module.exports = {
  sendMail,
};