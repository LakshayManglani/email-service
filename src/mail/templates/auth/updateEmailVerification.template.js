function updateEmailverificationTemplate(data) {
  const projectName = 'DevSync';
  const { username, verificationLink } = data;

  const subject = `Welcome to ${projectName}!`;
  const html = `
            <p>Hi ${username},</p>
            <p>We received a request to update the email address associated with your ${projectName} account.</p>
            <p>If you made this request, please verify your new email address by clicking the button below:</p>
            <a href="${verificationLink}" style="padding: 10px 20px; background-color: #1E90FF; color: #fff; text-decoration: none; border-radius: 5px;">Verify New Email</a>
            <p>If the button above doesn't work, you can also verify your new email by copying and pasting the following link into your browser:</p>
            <p>${verificationLink}</p>
            <p>This link will expire in 60 seconds. If you didn't request this change, please ignore this email or contact our support team.</p>
            <p>Thank you,<br>The ${projectName} Team</p>
        `;

  return { subject, html };
}

export default updateEmailverificationTemplate;
