const express = require("express");
const auth = require("../../middlewares/auth");
const { subscribtionController } = require("../../controllers");

const router = express.Router();


// show all the subacription 
//----------------------------------------------
router.get("/show-all",subscribtionController.showSubscription)
router.get("/admin-earning",subscribtionController.showMyearning)

router.patch("/update-byId",subscribtionController.updateSbuscription)
router.patch("/update-byIdTrue",subscribtionController.updateSbuscriptionTrueFalse)
  

  

  

module.exports = router;
