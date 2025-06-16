const mongoose = require("mongoose");

// Speed Taping User Schema
const speedTapingUserSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    highScore: { type: Number, default: 0 }
  },
  { timestamps: true, versionKey: false }
);

// Speed Taping History Schema
const speedTapingHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    playedAt: { type: Date, default: Date.now }
  },
  { timestamps: true, versionKey: false }
);

// Export both models from one file
const SpeedTapingUser = mongoose.model("SpeedTapingUser", speedTapingUserSchema);
const SpeedTapingHistory = mongoose.model("SpeedTapingHistory", speedTapingHistorySchema);

module.exports = { SpeedTapingUser, SpeedTapingHistory };
