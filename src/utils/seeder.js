const mongoose = require("mongoose");
require("dotenv").config();
const { User } = require("../models");
const Subscription = require("../models/subscription"); // Make sure the path is correct

const usersData = [
  {
    fullName: "Testing Super Admin",
    email: "admin@gmail.com",
    phoneNumber: "01735566789",
    password: "$2a$08$cUQ3uMdbQjlyDF/dgn5mNuEt9fLJZqq8TaT9aKabrFuG5wND3/mPO", // password: 1qazxsw2
    role: "superAdmin",
    isEmailVerified: true,
  },
  {
    fullName: "Testing Admin",
    email: "cole@gmail.com",
    phoneNumber: "01735566789",
    password: "$2a$08$cUQ3uMdbQjlyDF/dgn5mNuEt9fLJZqq8TaT9aKabrFuG5wND3/mPO",
    role: "admin",
    isEmailVerified: true,
  },
  {
    fullName: "Testing User",
    email: "user@gmail.com",
    phoneNumber: "01734456873",
    dateOfBirth: "2000-06-22",
    password: "$2a$08$cUQ3uMdbQjlyDF/dgn5mNuEt9fLJZqq8TaT9aKabrFuG5wND3/mPO",
    role: "user",
    isEmailVerified: true,
  },
];

const subscriptionData = [
  {
    subscriptionType: "month",
    price: 20,
    isDiscount: false,
    discountPrice: 0,
  },
  {
    subscriptionType: "year",
    price: 200,
    isDiscount: true,
    discountPrice: 10,
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

const dropDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
    console.log("Database dropped successfully!");
  } catch (err) {
    console.error("Error dropping database:", err);
  }
};

const seedUsers = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(usersData);
    console.log("Users seeded successfully!");
  } catch (err) {
    console.error("Error seeding users:", err);
  }
};

const seedSubscriptions = async () => {
  try {
    await Subscription.deleteMany();
    await Subscription.insertMany(subscriptionData);
    console.log("Subscriptions seeded successfully!");
  } catch (err) {
    console.error("Error seeding subscriptions:", err);
  }
};

const seedDatabase = async () => {
  await connectDB();
  await dropDatabase();
  await seedUsers();
  await seedSubscriptions();
  console.log("Database seeding completed!");
  mongoose.disconnect();
};

seedDatabase();
