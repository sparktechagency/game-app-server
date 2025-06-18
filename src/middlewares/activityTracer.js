// const User = require('../models/user.model');
// const { sendInactivityEmail } = require('../services/email.service');

const User = require("../models/user.model");


// const userActivity = async (req, res, next) => {
//   try {
//     if (req.user && req.user.id) {
//       const user = await User.findById(req.user.id);

//       if (user) {
//         // const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

//         const sevenDaysAgo = Date.now() - 3 * 60 * 1000;
        

//         if (new Date(user.lastActiveAt).getTime() < sevenDaysAgo) {
//           await sendInactivityEmail(user.email, user.fullName || user.firstName);
//           console.log(`Inactivity email sent to ${user.email}`);
//         }

//         // Always update last active time
//         user.lastActiveAt = new Date();
//         await user.save();
//       }
//     }
//   } catch (error) {
//     console.error('Error in user activity tracking:', error.message);
//   }

//   next();
// };

// module.exports = userActivity;


const userActivity = async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      const user = await User.findById(req.user.id);

      if (user) {
        // ✅ Just update the last activity time
        user.lastActiveAt = new Date();
        user.isInactiveEmailSent = false; // Reset email sent flag if user is active again
        await user.save();
      }
    }
  } catch (error) {
    console.error('Error in user activity tracking:', error.message);
  }

  next();
};

module.exports = userActivity;
