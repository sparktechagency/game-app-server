const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { arrowGameService } = require("../services");


// Create or update arrow game score
const createArrowScore = catchAsync(async (req, res) => {
    const { score } = req.body;
    const userId = req.user.id;

    if (!score || score <= 0) {
        return res.status(httpStatus.BAD_REQUEST).json(
            response({
                message: 'Score must be provided and greater than 0.',
                status: 'ERROR',
                statusCode: httpStatus.BAD_REQUEST,
                data: {}
            })
        );
    }

    await arrowGameService.saveArrowScore(userId, score);

    return res.status(httpStatus.CREATED).json(
        response({
            message: 'Score saved successfully',
            status: 'OK',
            statusCode: httpStatus.CREATED,
            data: {}
        })
    );
});

// Get user high score and history
const showArrowUserScores = catchAsync(async (req, res) => {
    const userId = req.user.id;

    const gameData = await arrowGameService.getArrowGameData(userId);

    return res.status(httpStatus.OK).json(
        response({
            message: 'User arrow game data fetched successfully',
            status: 'OK',
            statusCode: httpStatus.OK,
            data: gameData
        })
    );
});

module.exports = { createArrowScore, showArrowUserScores };
