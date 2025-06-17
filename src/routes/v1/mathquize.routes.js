const express = require("express");
const auth = require("../../middlewares/auth");
const {  pictureMatheController, mathquizegameController } = require("../../controllers");


const router = express.Router();


// show all the subacription 
//----------------------------------------------
router.post("/create",auth("common"),mathquizegameController.createMathquizeScore)
router.get('/show',auth("common"),mathquizegameController.showMathquizeUserScores)



  

  

  

module.exports = router;
