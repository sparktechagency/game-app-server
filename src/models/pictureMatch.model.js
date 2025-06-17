const mongoose = require("mongoose");

// Speed Taping User Schema
const picturematchUserSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    highScore: { type: Number, default: 0 }
  },
  { timestamps: true, versionKey: false }
);

// Speed Taping History Schema
const pictureMatchGameHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    playedAt: { type: Date, default: Date.now }
  },
  { timestamps: true, versionKey: false }
);

// Export both models from one file
const PictureMatchGameUser = mongoose.model("PictureMatchGameUser", picturematchUserSchema);
const PictureMatchGameHistory = mongoose.model("PictureMatchGameHistory", pictureMatchGameHistorySchema);

module.exports = { PictureMatchGameUser, PictureMatchGameHistory };
