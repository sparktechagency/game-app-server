const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { saveScore, getUserGameData } = require("../services/speedTapping.service");
const response = require("../config/response");
const ApiError = require("../utils/ApiError");


// Create or update score
const createScore = catchAsync(async (req, res) => {
    const { score } = req.body;
    const userId = req.user.id; // Assuming you are using JWT and user is attached to req.user

    if (!score || score <= 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Score must be provided and greater than 0.');
    }

    const result = await saveScore(userId, score);

    res.status(httpStatus.CREATED).json(
        response({
            message: 'Score saved successfully',
            status: 'OK',
            statusCode: httpStatus.CREATED,
            data: {}
        })
    );
});

// Show high score and history
const showUserScores = catchAsync(async (req, res) => {
    const userId = req.user.id;

    const gameData = await getUserGameData(userId);

    res.status(httpStatus.OK).json(
        response({
            message: 'User game data fetched successfully',
            status: 'OK',
            statusCode: httpStatus.OK,
            data: gameData
        })
    );
});

module.exports = { createScore, showUserScores };
