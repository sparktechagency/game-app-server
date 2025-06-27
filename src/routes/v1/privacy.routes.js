const express = require('express');
const { privacyController } = require('../../controllers');
const router = express.Router();


// Privacy
router.get('/privacy', privacyController.showPrivacy);
router.put('/privacy', privacyController.updatePrivacy);

// About Us
router.get('/about-us', privacyController.showAboutUs);
router.put('/about-us', privacyController.updateAboutUs);

module.exports = router;
