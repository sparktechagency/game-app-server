const express = require("express");
const auth = require("../../middlewares/auth");
const { subscribtionController } = require("../../controllers");

const router = express.Router();


// show all the subacription 
//----------------------------------------------
router.get("/show-all",subscribtionController.showSubscription)
  

  

  

module.exports = router;
