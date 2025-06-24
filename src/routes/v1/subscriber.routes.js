// routes/subscription.route.js

const express = require('express');

const auth = require('../../middlewares/auth');
const { subscriberController } = require('../../controllers');


const router = express.Router();

router.post('/',auth("common"), subscriberController.createSubscription);
router.post('/cancel', auth("common"), subscriberController.cancelSubscription);
router.get('/', auth("common"), subscriberController.getSubscription);

module.exports = router;
