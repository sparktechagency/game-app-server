// controllers/staticContent.controller.js

const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { privacyService } = require("../services");
const response = require("../config/response");


// Show Privacy
const showPrivacy = catchAsync(async (req, res) => {
  const data = await privacyService.getPrivacy();
  return res.status(httpStatus.OK).json(
    response({
      message: "Privacy Policy Fetched",
      statusCode: httpStatus.OK,
      data,
    })
  );
});

// Update Privacy
const updatePrivacy = catchAsync(async (req, res) => {
  const { id } = req.query;
  const data = await privacyService.updatePrivacy(id, req.body);
  return res.status(httpStatus.OK).json(
    response({
      message: "Privacy Policy Updated",
      statusCode: httpStatus.OK,
      data,
    })
  );
});

// Show About Us
const showAboutUs = catchAsync(async (req, res) => {
  const data = await privacyService.getAboutUs();
  return res.status(httpStatus.OK).json(
    response({
      message: "About Us Fetched",
      statusCode: httpStatus.OK,
      data,
    })
  );
});

// Update About Us
const updateAboutUs = catchAsync(async (req, res) => {
  const { id } = req.query;
  const data = await privacyService.updateAboutUs(id, req.body);
  return res.status(httpStatus.OK).json(
    response({
      message: "About Us Updated",
      statusCode: httpStatus.OK,
      data,
    })
  );
});

module.exports = {
  showPrivacy,
  updatePrivacy,
  showAboutUs,
  updateAboutUs,
};
