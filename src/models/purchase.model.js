// const mongoose = require("mongoose");

// const purchaseSchema = new mongoose.Schema(
//   {
//     user:{type:mongoose.Schema.Types.ObjectId,ref:"User",require:true},
//    subscriptionType:{type:String,enum:["month","year"],require:true},
//    price:{type:Number,require:true},
//    transactionId:{type:String,required:true},
//    status:{type:String,required:true}
   


//   },
//   { 
//     timestamps: true,
//     versionKey: false 
//   }
// );

// module.exports = mongoose.model("Purchase", purchaseSchema);
const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    subscriptionType: { type: String, enum: ["none", "monthly", "yearly"], default: "none" },

    price: { type: Number, required: true },

    transactionId: { type: String, required: true }, // Unique transaction ID from Stripe

    subscriptionId: { type: String, default: null }, // Stripe recurring subscription ID

    customerId: { type: String, default: null }, // Stripe customer ID (permanent for user)

    status: { type: String, enum: ["trialing", "active", "canceled", "past_due", "unpaid"], required: true },

    // Trial Information
    trialStartDate: { type: Date, default: null },
    trialEndDate: { type: Date, default: null },

    // Subscription Billing Cycle
    currentPeriodStart: { type: Date, default: null },
    currentPeriodEnd: { type: Date, default: null },

    // User Cancellation Intent
    cancelAtPeriodEnd: { type: Boolean, default: false }, // If user requested cancellation

    // Payment Method Info (Optional, but useful for admin tracking)
    paymentMethod: { type: String, default: null }, // e.g. 'card'
    cardBrand: { type: String, default: null }, // e.g. 'visa'
    cardLast4: { type: String, default: null }, // e.g. '4242'
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Purchase", purchaseSchema);
