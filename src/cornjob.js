const cron = require('node-cron');
const User = require('./models/user.model');
const { sendInactivityEmail } = require('./services/email.service');

// // Runs every 1 minute
// cron.schedule('* * * * *', async () => {
//   console.log('Running inactivity check...');

//   try {
//     const now = new Date();
//     const threeMinutesAgo = new Date(now - 3 * 60 * 1000);
 

//     const inactiveUsers = await User.find({
//       lastActiveAt: { $lt: threeMinutesAgo },
//     });
  

//     for (const user of inactiveUsers) {
//       let shouldSendEmail = false;
//        let nextEmailTime;

//       if (!user.lastInactiveEmailSentAt) {
//         // First email
//         shouldSendEmail = true;
//       } else {
//          nextEmailTime = new Date(user.lastInactiveEmailSentAt.getTime() + 3 * 60 * 1000);
//         if (now >= nextEmailTime) {
//           // Next scheduled email
//           shouldSendEmail = true;
//         }
//       }

//       if (shouldSendEmail) {
//         await sendInactivityEmail(user.email, user.fullName || user.firstName,nextEmailTime);
//         console.log(`Inactivity email sent to ${user.email}`);

//         user.lastInactiveEmailSentAt = now; // Update last email sent time
//         await user.save();
//       }
//     }
//   } catch (error) {
//     console.error('Error checking inactive users:', error.message);
//   }
// });

// Runs every day at midnight (00:00 server time)
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily inactivity check...');

  try {
    const now = new Date();

    const inactiveUsers = await User.find({
      lastActiveAt: { $lt: new Date(now - 1 * 24 * 60 * 60 * 1000) }, // Users inactive for at least 7 days
    });

    for (const user of inactiveUsers) {
      let shouldSendEmail = false;

      // Calculate inactive days
      const inactiveDays = ((now - user.lastActiveAt) / (1000 * 60 * 60 * 24)).toFixed(1);

      if (!user.lastInactiveEmailSentAt) {
        // First email after 7 days
        shouldSendEmail = true;
      } else {
        // Follow-up emails every 3 days
        const nextEmailTime = new Date(user.lastInactiveEmailSentAt.getTime() + 1 * 24 * 60 * 60 * 1000); // 3 days later
        if (now >= nextEmailTime) {
          shouldSendEmail = true;
        }
      }

      if (shouldSendEmail) {
        await sendInactivityEmail(user.email, user.fullName || user.firstName, inactiveDays);
        console.log(`Inactivity email sent to ${user.email} (Inactive for ${inactiveDays} days)`);

        user.lastInactiveEmailSentAt = now; // Update last email sent time
        await user.save();
      }
    }
  } catch (error) {
    console.error('Error checking inactive users:', error.message);
  }
});
