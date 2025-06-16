


const { Purchase, User } = require("../models");

// make the user perchse for the game
//-----------------------------------------------

const makePurchase=async(id,data)=>{

    const now = new Date();
let periodEnd;

if (data.subscriptionType === "monthly") {
    periodEnd = new Date(now.setMonth(now.getMonth() + 1)); // Add 1 month
} else if (data.subscriptionType === "yearly") {
    periodEnd = new Date(now.setFullYear(now.getFullYear() + 1)); // Add 1 year
}

const newPurchase = new Purchase({
    user: id,
    subscriptionType:data.subscriptionType,
    price:data.price,
    transactionId:data.transactionId,
    subscriptionId:data.subscriptionId,
    customerId:data.customerId,
    status: "active",
    trialStartDate: null, // Trial already ended if they purchased directly
    trialEndDate: null,
    currentPeriodStart: new Date(), // Start now
    currentPeriodEnd: periodEnd,
    cancelAtPeriodEnd: false,
});

await newPurchase.save();
const user = await User.findByIdAndUpdate(
    id,                         // User ID
    { isSubscribed: true },             // Fields to update
    { new: true }               // Option to return the updated document
);


}

module.exports={
    makePurchase,
    
}