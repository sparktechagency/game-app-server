const httpStatus = require('http-status');
const response = require('../config/response');
const { pictureMatchService } = require('../services');
const catchAsync = require('../utils/catchAsync');



// Create or update Picture Match game score
const createPictureMatchScore = catchAsync(async (req, res) => {
    const { score } = req.body;
    const userId = req.user.id;

    if (!score || isNaN(score) || Number(score) <= 0) {
        return res.status(httpStatus.BAD_REQUEST).json(
            response({
                message: 'Score must be provided and must be a number greater than 0.',
                status: 'ERROR',
                statusCode: httpStatus.BAD_REQUEST,
                data: {}
            })
        );
    }

    await pictureMatchService.savePictureMatchScore(userId, Number(score));

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
const showPictureMatchUserScores = catchAsync(async (req, res) => {
    const userId = req.user.id;

    const gameData = await pictureMatchService.getPictureMatchGameData(userId);

    return res.status(httpStatus.OK).json(
        response({
            message: 'User picture match game data fetched successfully',
            status: 'OK',
            statusCode: httpStatus.OK,
            data: gameData
        })
    );
});

module.exports = { createPictureMatchScore, showPictureMatchUserScores };
