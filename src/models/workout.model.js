const mongoose = require("mongoose");

const workoutGameSchema = new mongoose.Schema(
  {
   user:{type:mongoose.Schema.Types.ObjectId,ref:"User",require:true},
   date:{type:Date, require:true},
   
   timeforplayGame:{type:Number,require:true,default:0},
   timeforWorkout:{type:Number,require:true,default:0},






  },
  { 
    timestamps: true,
    versionKey: false 
  }
);

module.exports = mongoose.model("WorkoutGameStatue", workoutGameSchema);
