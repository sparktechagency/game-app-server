const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const { sendEmailVerification } = require("./email.service");
const unlinkImages = require("../common/unlinkImage");

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  // const oneTimeCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000; for the 6 digit code 
  const oneTimeCode = Math.floor(1000 + Math.random() * 9000);
  console.log(oneTimeCode);


  if (userBody.role === "user" || userBody.role === "admin") {

    sendEmailVerification(userBody.email, oneTimeCode);
  }
  return User.create({ ...userBody, oneTimeCode });
};



const queryUsers = async (filter, options) => {
  const query = {};

  // Loop through each filter field and add conditions if they exist
  for (const key of Object.keys(filter)) {
    if (
      (key === "fullName" || key === "email" || key === "username") &&
      filter[key] !== ""
    ) {
      query[key] = { $regex: filter[key], $options: "i" }; // Case-insensitive regex search for name
    } else if (filter[key] !== "") {
      query[key] = filter[key];
    }
  }

  const users = await User.paginate(query, options);

  // Convert height and age to feet/inches here...

  return users;
};



const getUserById = async (id) => {
  return User.findById(id);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  // if (files && files.length > 0) {
  //   updateBody.photo = files;
  // } else {
  //   delete updateBody.photo; // remove the photo property from the updateBody if no new photo is provided
  // }
// console.log(updateBody,"sdklfjsdkl;fjsd");
  Object.assign(user, updateBody);
  await user.save();
  console.log(user,"sdjlksfjlksdfjlksdf ");
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

const isUpdateUser = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // const oneTimeCode =
  //   Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  const oneTimeCode = Math.floor(1000 + Math.random() * 9000);


  if (updateBody.role === "user" || updateBody.role === "admin") {
    sendEmailVerification(updateBody.email, oneTimeCode);
  }

  Object.assign(user, updateBody, {
    isDeleted: false,
    isSuspended: false,
    isEmailVerified: false,
    isResetPassword: false,
    isPhoneNumberVerified: false,
    oneTimeCode: oneTimeCode,
  });
  await user.save();
  return user;
};


// user overview in the admin dahsbored 
//-----------------------------------------------------
const userOverview = async () => {
  const now = new Date();
  const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000); // 🔁 7 days ago

  const totalUsers = await User.countDocuments({ isDeleted: false });
  const premiumUsers = await User.countDocuments({ isSubscribed: true, isDeleted: false });

  const newUsersLast7Days = await User.countDocuments({
    createdAt: { $gte: sevenDaysAgo }, // 🔁 Changed from today to 7 days ago
    isDeleted: false,
  });

  const activeUsers = await User.countDocuments({
    lastActiveAt: { $gte: oneDayAgo },
    isDeleted: false,
  });

  return {
    totalUsers,
    premiumUsers,
    newUsersLast7Days,
    activeUsers,
  };
};

// show all the user or premaire user graph 
//-------------------------------------------------------------
const getMonthlyUserGraphData = async (type, year) => {
  const match = {
    isDeleted: false,
    createdAt: {
      $gte: new Date(`${year}-01-01T00:00:00Z`),
      $lte: new Date(`${year}-12-31T23:59:59Z`)
    }
  };

  if (type === 'premium') {
    match.isSubscribed = true;
  }

  const monthlyData = await User.aggregate([
    { $match: match },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 }
      }
    }
  ]);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const finalData = monthNames.map((month, index) => {
    const dataItem = monthlyData.find(item => item._id === index + 1);
    return {
      month,
      count: dataItem ? dataItem.count : 0
    };
  });

  return finalData;
};


// show all the user for the admin dashbored 
//-------------------------------------------------------

const showAllUser = async () => {
  const result = await User.find({ role: 'user', isDeleted: false });
  return result;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  isUpdateUser,
  userOverview,
  getMonthlyUserGraphData,
  showAllUser
};