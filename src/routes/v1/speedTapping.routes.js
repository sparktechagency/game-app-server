const express = require("express");
const auth = require("../../middlewares/auth");
const {   speedTappingController } = require("../../controllers");


const router = express.Router();


// show all the subacription 
//----------------------------------------------
router.post("/create",auth("common"),speedTappingController.createScore)
router.get("/show",auth("common"),speedTappingController.showUserScores)



  

  

  

module.exports = router;
