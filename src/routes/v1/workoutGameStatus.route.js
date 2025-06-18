const express = require("express");
const auth = require("../../middlewares/auth");
const {  purchaseController, workoutGameStatusController } = require("../../controllers");
const userActivity = require("../../middlewares/activityTracer");


const router = express.Router();


// show all the subacription 
//----------------------------------------------
router.post("/time-upload",auth("common"),userActivity,workoutGameStatusController.workoutGameCreatore)
router.get('/grpah',auth("common"),userActivity,workoutGameStatusController.getWorkoutGameStatus)



  

  

  

module.exports = router;
