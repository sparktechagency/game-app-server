const { SpeedTapingUser, SpeedTapingHistory } = require("../models/speedTapping.model");


// Save a new score
const saveScore = async (userId, score) => {
    console.log(userId, score);
    // Save score in history
    await SpeedTapingHistory.create({ user: userId, score });

    // Find or create user high score
    let userRecord = await SpeedTapingUser.findOne({ user: userId });
    if (!userRecord) {
        userRecord = await SpeedTapingUser.create({ user: userId, highScore: score });
    } else if (score > userRecord.highScore) {
        userRecord.highScore = score;
        await userRecord.save();
    }

    return userRecord;
};

// Get high score and history
const getUserGameData = async (userId) => {
    const highScoreData = await SpeedTapingUser.findOne({ user: userId });
    const history = await SpeedTapingHistory.find({ user: userId }).sort({ playedAt: -1 });

    return {
        highScore: highScoreData ? highScoreData.highScore : 0,
        history
    };
};

module.exports = { saveScore, getUserGameData };
