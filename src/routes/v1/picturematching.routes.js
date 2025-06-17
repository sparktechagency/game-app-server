const express = require("express");
const auth = require("../../middlewares/auth");
const {  pictureMatheController } = require("../../controllers");


const router = express.Router();


// show all the subacription 
//----------------------------------------------
router.post("/create",auth("common"),pictureMatheController.createPictureMatchScore)
router.get('/show',auth("common"),pictureMatheController.showPictureMatchUserScores)



  

  

  

module.exports = router;
