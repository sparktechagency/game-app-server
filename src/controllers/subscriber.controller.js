// controllers/subscription.controller.js

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const { subscriberService } = require('../services');
const response = require('../config/response');

const createSubscription = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { subscriptionType, price, trasansitionId } = req.body;

  if (!subscriptionType || !price || !trasansitionId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: 'failed',
      message: 'All subscription fields are required',
    });
  }

  // Calculate expiresAt based on subscriptionType
  const now = new Date();
  let expiresAt;

  if (subscriptionType === 'month') {
    expiresAt = new Date(now.setMonth(now.getMonth() + 1));
  } else if (subscriptionType === 'year') {
    expiresAt = new Date(now.setFullYear(now.getFullYear() + 1));
  } else {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: 'failed',
      message: 'Invalid subscription type',
    });
  }

  const subscription = await subscriberService.createSubscription(userId, {
    subscriptionType,
    price,
    expiresAt,
    trasansitionId,
  });

  return res.status(httpStatus.CREATED).json(
    response({
      message: "Subscription created successfully",
      status: "OK",
      statusCode: httpStatus.CREATED,
      data: subscription,
    })
  );
});



// Cancel subscription
const cancelSubscription = catchAsync(async (req, res) => {
  const userId = req.user.id;

  try {
    const cancelledSubscription = await subscriberService.cancelSubscription(userId);

    return res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Subscription cancelled successfully',
      data: cancelledSubscription,
    });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).json(
        response({
      message: "cancled subscription ",
      status: "OK",
      statusCode: httpStatus.OK,
      
     
    })
    );
  }
});

// Get current subscription
const getSubscription = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const subscription = await subscriberService.getUserSubscription(userId);

  if (!subscription) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: 'failed',
      message: 'No subscription found',
    });
  }

  return res.status(httpStatus.OK).json(
     response({
      message: "my subscription  the subscription  ",
      status: "OK",
      statusCode: httpStatus.OK,
      data: subscription,
     
    }));
});
// Get current subscription
const showAlltheSubscriber = catchAsync(async (req, res) => {
  const { name } = req.query; // get full name from query

  const subscription = await subscriberService.showAlltheSubscriber(name);

  if (!subscription || subscription.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: 'failed',
      message: 'No subscription found',
    });
  }

  return res.status(httpStatus.OK).json(
    response({
      message: "Filtered subscription list by full name",
      status: "OK",
      statusCode: httpStatus.OK,
      data: subscription,
    })
  );
});

// Get current subscription
const showSubscriberUserById = catchAsync(async (req, res) => {
  const {id} = req.query;

  const subscription = await subscriberService.showSubscriberUserById(id);

  if (!subscription) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: 'failed',
      message: 'No subscription found',
    });
  }

  return res.status(httpStatus.OK).json(
     response({
      message: "my subscription  the subscription  ",
      status: "OK",
      statusCode: httpStatus.OK,
      data: subscription,
     
    }));
});

module.exports = {
  createSubscription,
  cancelSubscription,
  getSubscription,
  showAlltheSubscriber,
  showSubscriberUserById
};
