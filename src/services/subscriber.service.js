// services/subscription.service.js


const Subscriber=require("../models/subscriber.model");
const User = require("../models/user.model");



// Create a new subscription
const createSubscription = async (userId, subscriptionData) => {
  const { subscriptionType, price, expiresAt, trasansitionId } = subscriptionData;

  const newSubscription = await Subscriber.create({
    user: userId,
    subscriptionType,
    price,
    expiresAt,
    trasansitionId,
    isActive: true,
  });
await User.findByIdAndUpdate(userId, { isSubscribed: true }, { new: true });

  return newSubscription;
};

// Cancel a user's active subscription
const cancelSubscription = async (userId) => {
  const activeSubscription = await Subscriber.findOne({
    user: userId,
    isActive: true,
  });

  if (!activeSubscription) {
    throw new Error('No active subscription found');
  }

  activeSubscription.isActive = false;
  await activeSubscription.save();
await User.findByIdAndUpdate(userId, { isSubscribed: true }, { new: true });


  return activeSubscription;
};

// Get user's latest subscription
const getUserSubscription = async (userId) => {
  return Subscriber.find({ user: userId }).populate("user","fullName email")
//   .select("user")
  .sort({ createdAt: -1 });
};


// for the admin to handel the subscriber 
//--------------------------------------
const showAlltheSubscriber = async (name) => {
  const matchStage = {};

  if (name) {
    matchStage['user.fullName'] = { $regex: name, $options: 'i' }; // filter by full name only
  }

  const result = await Subscriber.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },
    { $match: matchStage },
    { $sort: { createdAt: -1 } }
  ]);

  return result;
};

// for the admin to handel the subscriber 
//--------------------------------------
const showSubscriberUserById=async()=>{

    

    const result = await Subscriber.findById(id).populate("user").sort({ createdAt: -1 });
    return result
}
module.exports = {
  createSubscription,
  cancelSubscription,
  getUserSubscription,
  showAlltheSubscriber,
  showSubscriberUserById
};
