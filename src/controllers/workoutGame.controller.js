
const httpStatus = require("http-status");
const { workoutGameService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");

const moment = require('moment');
const ApiError = require("../utils/ApiError");



// create how logh user are worked and plyed
//--------------------------------------------------------------

const workoutGameCreatore=catchAsync(async(req,res)=>{

    const id=req.user._id
    const result=await workoutGameService.workoutGameCreatore(id,req.body)

     // Return the success response
           res.status(httpStatus.CREATED).json(
            response({
              message: "succesfully  add the time in my database",
              status: "OK",
              statusCode: httpStatus.CREATED,
              data: result,
             
            }))

})
// create how logh user are worked and plyed
//--------------------------------------------------------------

// const getWorkoutGameStatus=catchAsync(async(req,res)=>{

//     const id=req.user._id

//      // Get current date
//         const currentDate = moment().startOf('day');
//         const { filterType } = req.query; 
//      // Call service to get data
//         const result = await workoutGameService.getWorkoutGameStatus(id, filterType, currentDate);

//      // Return the success response
//            res.status(httpStatus.CREATED).json(
//             response({
//               message: "showing my statuse graph",
//               status: "OK",
//               statusCode: httpStatus.CREATED,
//               data: result,
             
//             }))

// })
const getWorkoutGameStatus = async (req, res) => {
    
        const userId = req.user._id; // Assuming you're using JWT authentication
        const { filter } = req.query;

   const allowedFilters = ['day', 'week', 'month', 'year'];

    if (!allowedFilters.includes(filter)) {
        return res.status(httpStatus.BAD_REQUEST).json(
            response({
              message: "invalid filter type. Only day, week, month, or year are allowed.",
              status: "bad requiest",
              statusCode: httpStatus.BAD_REQUEST,
              
             
            }))
    }
        const date = moment().startOf('day');
        const result = await workoutGameService.getWorkoutGameStatus(userId, filter, date);

    //   Return the success response
           res.status(httpStatus.OK).json(
            response({
              message: "showing my statuse graph",
              status: "OK",
              statusCode: httpStatus.OK,
              data: result,
             
            }))
   
};

module.exports={
    workoutGameCreatore,
    getWorkoutGameStatus
}