const express = require("express");
const auth = require("../../middlewares/auth");
const {  purchaseController } = require("../../controllers");

const router = express.Router();


// show all the subacription 
//----------------------------------------------
router.post("/create",auth("common"),purchaseController.makePurchase)



  

  

  

module.exports = router;
