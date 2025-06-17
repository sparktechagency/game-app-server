const { MathquizeUser, MathquizHistory } = require("../models/mathquize.model");


// Save a new mathquize score
const saveMathquizeScore = async (userId, score) => {
    console.log(userId, score);

    // Save score in history
    await MathquizHistory.create({ user: userId, score });

    // Find or create user high score
    let userRecord = await MathquizeUser.findOne({ user: userId });
    if (!userRecord) {
        userRecord = await MathquizeUser.create({ user: userId, highScore: score });
    } else if (score > userRecord.highScore) {
        userRecord.highScore = score;
        await userRecord.save();
    }

    return userRecord;
};

// Get high score and history
const getMathquizeUserData = async (userId) => {
    const highScoreData = await MathquizeUser.findOne({ user: userId });
    // const history = await MathquizHistory.find({ user: userId }).sort({ playedAt: -1 });

    return {
        highScore: highScoreData ? highScoreData.highScore : 0,
    }
};

module.exports = { saveMathquizeScore, getMathquizeUserData };
