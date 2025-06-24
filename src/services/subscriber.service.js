// services/subscription.service.js

const Subscriber=require("../models/subscriber.model")


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

  return activeSubscription;
};

// Get user's latest subscription
const getUserSubscription = async (userId) => {
  return Subscriber.findOne({ user: userId }).sort({ createdAt: -1 });
};

module.exports = {
  createSubscription,
  cancelSubscription,
  getUserSubscription,
};
