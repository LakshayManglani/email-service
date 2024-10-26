function verificationTemplate(data) {
  const projectName = 'DevSync';
  const { username, verificationLink } = data;

  const subject = `Welcome to ${projectName}!`;
  const html = `
      <p>Hi ${username},</p>
      <p>Welcome to ${projectName}! We're excited to have you on board.</p>
      <p>To complete your registration, please verify your email address by clicking the button below:</p>
      <a href="${verificationLink}" style="padding: 10px 20px; background-color: #1E90FF; color: #fff; text-decoration: none; border-radius: 5px;">Verify My Email</a>
      <p>If the button above doesn't work, you can also verify your email by copying and pasting the following link into your browser:</p>
      <p>${verificationLink}</p>
      <p>This link will expire in 60 seconds. If you didn't sign up for a ${projectName} account, please ignore this email.</p>
      <p>Thank you,<br>The ${projectName} Team</p>
    `;

  return { subject, html };
}

export default verificationTemplate;
