const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {  mathquizeService } = require("../services");
const response = require("../config/response");


// Create or update Mathquize score
const createMathquizeScore = catchAsync(async (req, res) => {
    let { score } = req.body;
    const userId = req.user.id;

    // Convert score to number
    score = parseInt(score);
    if (!score || score <= 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Score must be provided and greater than 0.');
    }

    const result = await mathquizeService.saveMathquizeScore(userId, score);

    res.status(httpStatus.CREATED).json(
        response({
            message: 'Mathquize score saved successfully',
            status: 'OK',
            statusCode: httpStatus.CREATED,
            data: {}
        })
    );
});

// Show Mathquize high score and history
const showMathquizeUserScores = catchAsync(async (req, res) => {
    const userId = req.user.id;

    const gameData = await mathquizeService.getMathquizeUserData(userId);

    res.status(httpStatus.OK).json(
        response({
            message: 'Mathquize user game data fetched successfully',
            status: 'OK',
            statusCode: httpStatus.OK,
            data: gameData
        })
    );
});

module.exports = { createMathquizeScore, showMathquizeUserScores };
