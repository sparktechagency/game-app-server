

const sgMail = require('@sendgrid/mail');
const config = require('../config/config');
const logger = require('../config/logger');

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* istanbul ignore next */
if (config.env !== 'test') {
  logger.info('SendGrid email service is ready');
}

const sendEmail = async (to, subject, html) => {
  const msg = {
    to,
    from: process.env.FROM_EMAIL, // Must be a verified sender in SendGrid
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    logger.info(`Email sent to ${to}`);
  } catch (error) {
    logger.error(`Email sending failed: ${error.message}`);
    if (error.response) {
      logger.error(error.response.body);
    }
  }
};

const sendEmailVerification = async (to, otp) => {
  console.log('sendEmailVerification', to, otp);
  const subject = 'User Verification Code';
  const html = `
    <body style="background-color: #f3f4f6; padding: 1rem; font-family: Arial, sans-serif;">
      <div style="max-width: 24rem; margin: 0 auto; background-color: #fff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Welcome to mental game App</h1>
        <p style="color: #4b5563; margin-bottom: 1rem;">Thank you for joining mental  App. Your account is almost ready!</p>
        <div style="background-color: #e5e7eb; padding: 1rem; border-radius: 0.25rem; text-align: center; font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">${otp}</div>
        <p style="color: #4b5563; margin-bottom: 1rem;">Enter this code to verify your account.</p>
        <p style="color: red; font-size: 0.8rem; margin-top: 1rem;">This code expires in <span id="timer">3:00</span> minutes.</p>
      </div>
    </body>
  `;
  await sendEmail(to, subject, html);
};

const sendResetPasswordEmail = async (to, otp) => {
  console.log('Password Reset Email', to, otp);
  const subject = 'Password Reset Email';
  const html = `
    <body style="background-color: #f3f4f6; padding: 1rem; font-family: Arial, sans-serif;">
      <div style="max-width: 24rem; margin: 0 auto; background-color: #fff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Password Reset</h1>
        <p style="color: #4b5563; margin-bottom: 1rem;">You have requested a password reset. Here is your reset code:</p>
        <div style="background-color: #e5e7eb; padding: 1rem; border-radius: 0.25rem; text-align: center; font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">${otp}</div>
        <p style="color: #4b5563; margin-bottom: 1rem;">Please enter this code to reset your password.</p>
        <p style="color: red; margin-bottom: 1rem;">This code is valid for 3 minutes.</p>
      </div>
    </body>
  `;
  await sendEmail(to, subject, html);
};

const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const html = `
    <p>Dear User,</p>
    <p>To verify your email, please click on this link:</p>
    <a href="${verificationEmailUrl}">${verificationEmailUrl}</a>
    <p>If you did not create an account, please ignore this email.</p>
  `;
  await sendEmail(to, subject, html);
};

const sendInactivityEmail = async (to, name) => {
  const subject = 'We Miss You!';
  const html = `
    <body style="background-color: #f3f4f6; padding: 1rem; font-family: Arial, sans-serif;">
      <div style="max-width: 24rem; margin: 0 auto; background-color: #fff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Hello ${name || 'there'},</h1>
        <p style="color: #4b5563; margin-bottom: 1rem;">We noticed you haven’t been active in the last 7 days. We miss you!</p>
        <p style="color: #4b5563; margin-bottom: 1rem;">Come back and check out what’s new!</p>
      </div>
    </body>
  `;

  await sendEmail(to, subject, html);
};

module.exports = {
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEmailVerification,
  sendInactivityEmail
};

