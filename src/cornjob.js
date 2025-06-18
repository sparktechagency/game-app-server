// /cronJobs/inactivityChecker.js
const cron = require('node-cron');
const User = require('./models/user.model');
const { sendInactivityEmail } = require('./services/email.service');


// Runs every 1 minute
cron.schedule('* * * * *', async () => {
  console.log('Running inactivity check...');

  try {
    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);

    const inactiveUsers = await User.find({
      lastActiveAt: { $lt: threeMinutesAgo },
      isInactiveEmailSent: { $ne: true },
    });

    for (const user of inactiveUsers) {
      await sendInactivityEmail(user.email, user.fullName || user.firstName);
      console.log(`Inactivity email sent to ${user.email}`);

      user.isInactiveEmailSent = true; // Mark email as sent
      await user.save();
    }
  } catch (error) {
    console.error('Error checking inactive users:', error.message);
  }
});
