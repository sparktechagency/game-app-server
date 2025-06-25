// routes/subscription.route.js

const express = require('express');

const auth = require('../../middlewares/auth');
const { subscriberController } = require('../../controllers');


const router = express.Router();

router.post('/',auth("common"), subscriberController.createSubscription);
router.post('/cancel', auth("common"), subscriberController.cancelSubscription);
router.get('/', auth("common"), subscriberController.getSubscription);
router.get('/show-all', auth("admin"), subscriberController.showAlltheSubscriber);
router.get('/user-id', auth("admin"), subscriberController.showSubscriberUserById);

module.exports = router;
