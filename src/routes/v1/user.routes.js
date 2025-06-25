const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const convertHeicToPngMiddleware = require("../../middlewares/converter");
const UPLOADS_FOLDER_USERS = "./public/uploads/users";

const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);

const router = express.Router();

router.route("/self/in").get(auth("common"), userController.getProfile);
router.route("/admin-overview").get(auth("admin"), userController.userOverview);
router.route("/admin-overview-graph").get(auth("admin"), userController.getUserGraphByMonth);
router.route("/admn-show-all-User").get(auth("admin"), userController.showAllUser);


router
  .route("/self/update")
  .patch(
    auth("common"),
    // validate(userValidation.updateUser),
    // [uploadUsers.single("image")],
    // convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
    userController.updateProfile
  );

  

module.exports = router;
