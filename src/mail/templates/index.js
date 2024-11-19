import updateEmailverificationTemplate from './auth/updateEmailVerification.template.js';
import verificationTemplate from './auth/verification.template.js';
import welcomeTemplate from './auth/welcome.template.js';

const templates = {
  'auth/welcome': welcomeTemplate,
  'auth/verification': verificationTemplate,
  'auth/update-email-verification': updateEmailverificationTemplate,
};

export default templates;
