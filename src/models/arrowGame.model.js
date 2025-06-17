const mongoose = require("mongoose");

// Speed Taping User Schema
const arrowUserSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    highScore: { type: Number, default: 0 }
  },
  { timestamps: true, versionKey: false }
);

// Speed Taping History Schema
const arrowGameHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    playedAt: { type: Date, default: Date.now }
  },
  { timestamps: true, versionKey: false }
);

// Export both models from one file
const ArrowGameUser = mongoose.model("ArrowGameUser", arrowUserSchema);
const ArrowGameHistory = mongoose.model("ArrowGameHistory", arrowGameHistorySchema);

module.exports = { ArrowGameUser, ArrowGameHistory };
