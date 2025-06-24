const mongoose = require("mongoose");

const subscription = new mongoose.Schema(
  {

    user:{type:mongoose.Schema.Types.ObjectId, ref:"User",reqquire:true},
   subscriptionType:{type:String,enum:["month","year"],require:true},
   price:{type:Number,require:true},
   expiresAt: { type: Date, required: true }, // Subscription end date
   isActive: { type: Boolean, default: true }, // Active or Expired
   trasansitionId:{type:String,require:true}

   


  },
  { 
    timestamps: true,
    versionKey: false 
  }
);

module.exports = mongoose.model("Subscriber", subscription);
