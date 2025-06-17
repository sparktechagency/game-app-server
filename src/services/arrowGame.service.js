const { ArrowGameUser, ArrowGameHistory } = require("../models/arrowGame.model");


// Save or update arrow game score
const saveArrowScore = async (userId, score) => {
    // Save new history
    await ArrowGameHistory.create({ user: userId, score });

    // Find or create user score
    let userScore = await ArrowGameUser.findOne({ user: userId });

    if (!userScore) {
        await ArrowGameUser.create({ user: userId, highScore: score });
    } else if (score > userScore.highScore) {
        userScore.highScore = score;
        await userScore.save();
    }
};

// Get user's high score and history
const getArrowGameData = async (userId) => {
    const userScore = await ArrowGameUser.findOne({ user: userId });


    return {
        highScore: userScore ? userScore.highScore : 0,
        
    };
};

module.exports = { saveArrowScore, getArrowGameData };
