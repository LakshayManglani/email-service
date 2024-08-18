/**
 * Generates a welcome email template.
 *
 * @param {Object} data - Data containing user information.
 * @param {string} data.firstName - The recipient's first name.
 * @returns {Object} - An object containing the subject and body of the welcome email.
 */
function welcomeTemplate(data) {
  const projectName = 'DevSync';
  const { firstName } = data;

  const subject = `Welcome to ${projectName}!`;
  const text = `
  Hi ${firstName},

  Welcome to ${projectName}! We're thrilled to have you with us.

  To get started, please visit our website at [Your Website URL] and explore all the exciting features available to you. If you have any questions or need assistance, our support team is here to help.

  Best regards,
  The ${projectName} Team
  `;

  return { subject, text };
}

export default welcomeTemplate;
