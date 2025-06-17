const express = require("express");
const auth = require("../../middlewares/auth");
const {   arrowGameController } = require("../../controllers");


const router = express.Router();


// show all the subacription 
//----------------------------------------------
router.post("/create",auth("common"),arrowGameController.createArrowScore)
router.get('/show',auth("common"),arrowGameController.showArrowUserScores)



  

  

  

module.exports = router;
