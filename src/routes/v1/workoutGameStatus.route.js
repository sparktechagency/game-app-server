const express = require("express");
const auth = require("../../middlewares/auth");
const {  purchaseController, workoutGameStatusController } = require("../../controllers");


const router = express.Router();


// show all the subacription 
//----------------------------------------------
router.post("/time-upload",auth("common"),workoutGameStatusController.workoutGameCreatore)
router.get('/grpah',auth("common"),workoutGameStatusController.getWorkoutGameStatus)



  

  

  

module.exports = router;
