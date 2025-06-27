// services/staticContent.service.js

const { PrivacyPolicy, AboutUs } = require("../models");


// Show Privacy
const getPrivacy = async () => {
  return await PrivacyPolicy.findOne().sort({ createdAt: -1 });
};

// Update Privacy
const updatePrivacy = async (id, updateData) => {
  return await PrivacyPolicy.findByIdAndUpdate(id, updateData, { new: true });
};

// Show About Us
const getAboutUs = async () => {
  return await AboutUs.findOne().sort({ createdAt: -1 });
};

// Update About Us
const updateAboutUs = async (id, updateData) => {
  return await AboutUs.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports = {
  getPrivacy,
  updatePrivacy,
  getAboutUs,
  updateAboutUs
};
