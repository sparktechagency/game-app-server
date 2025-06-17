const { PictureMatchGameUser, PictureMatchGameHistory } = require("../models/pictureMatch.model");


// Save or update Picture Match game score
const savePictureMatchScore = async (userId, score) => {
    // Save new history
    await PictureMatchGameHistory.create({ user: userId, score });

    // Find or create user's high score
    let userScore = await PictureMatchGameUser.findOne({ user: userId });

    if (!userScore) {
        await PictureMatchGameUser.create({ user: userId, highScore: score });
    } else if (score > userScore.highScore) {
        userScore.highScore = score;
        await userScore.save();
    }
};

// Get user's high score and history
const getPictureMatchGameData = async (userId) => {
    const userScore = await PictureMatchGameUser.findOne({ user: userId });
    const gameHistory = await PictureMatchGameHistory.find({ user: userId }).sort({ playedAt: -1 });

    return {
        highScore: userScore ? userScore.highScore : 0,
        gameHistory
    };
};

module.exports = { savePictureMatchScore, getPictureMatchGameData };
