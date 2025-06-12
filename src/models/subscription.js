const mongoose = require("mongoose");

const subscription = new mongoose.Schema(
  {
   subscriptionType:{type:String,enum:["month","year"],require:true},
   price:{type:Number,require:true},
   isDiscount:{type:Boolean,default:false},
   discountPrice:{type:Number,default:0},
   


  },
  { 
    timestamps: true,
    versionKey: false 
  }
);

module.exports = mongoose.model("Subscription", subscription);
