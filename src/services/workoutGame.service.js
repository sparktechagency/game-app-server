const { WorkoutGameStatuse } = require("../models");


const mongoose = require('mongoose');
const moment = require('moment');
const ApiError = require("../utils/ApiError");

// Create or Update Workout and Game Stats
//---------------------------------------------------------------
const workoutGameCreatore = async (id, data) => {
    let { date, timeforplayGame, timeforWorkout } = data;

    
  // Ensure the input times are converted to integers
  timeforplayGame = parseInt(timeforplayGame, 10);
  timeforWorkout = parseInt(timeforWorkout, 10);

  if (isNaN(timeforplayGame) || isNaN(timeforWorkout)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Time values must be valid numbers.');
  }
    // Check if entry exists for this user and date
    const existingData = await WorkoutGameStatuse.findOne({ user: id, date });

    if (existingData) {
        // If found, update by adding new time to previous time
        existingData.timeforplayGame += timeforplayGame;
        existingData.timeforWorkout += timeforWorkout;

        const updatedData = await existingData.save();

        return {
            message: "Workout and Game time updated successfully.",
            data: updatedData
        };
    } else {
        // If not found, create a new entry
        const newData = new WorkoutGameStatuse({
            user: id,
            date,
            timeforplayGame,
            timeforWorkout
        });

        const savedData = await newData.save();

        return savedData
    }
};



// show statuse of the game 
//--------------------------------------------
// const getWorkoutGameStatus = async (userId, filter, date) => {
  
//         let startDate, endDate;

//           console.log(filter,userId,date);

//         if (!date) {
//             throw new Error('Date parameter is required');
//         }

//         switch (filter) {
//             case 'day':
//                 startDate = moment(date).startOf('day').toDate();
//                 endDate = moment(date).endOf('day').toDate();
//                 break;

//             case 'week':
//                 startDate = moment(date).startOf('week').toDate();
//                 endDate = moment(date).endOf('week').toDate();
//                 break;

//             case 'month':
//                 startDate = moment(date).startOf('month').toDate();
//                 endDate = moment(date).endOf('month').toDate();
//                 break;

//             default:
//                 throw new Error('Invalid filter type. Use day, week, or month.');
//         }


//         const records = await WorkoutGameStatuse.find({
//             userId: userId,
//             date: { $gte: startDate, $lte: endDate }
//         }).sort({ date: -1 });

//       console.log(records);
//         return records
  
// };





// Day and month name arrays
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// // Helper function: Convert seconds to H:M:S string
// function formatSeconds(seconds) {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;

//     const parts = [];
//     if (hrs > 0) parts.push(`${hrs}h`);
//     if (mins > 0) parts.push(`${mins}m`);
//     if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

//     return parts.join(' ');
// }

// const getWorkoutGameStatus = async (userId, filter, date) => {
//     let startDate, endDate;

//     if (!date) {
//         throw new Error('Date parameter is required');
//     }
//      // Allowed filter values
//     const allowedFilters = ['day', 'week', 'month', 'year'];

//     // Validation for filter
//     if (!allowedFilters.includes(filter)) {
//         throw new Error('Invalid filter type. Only day, week, month, or year are allowed.');
//     }

//     switch (filter) {
//         case 'day':
//             startDate = moment.utc(date).startOf('day').toDate();
//             endDate = moment.utc(date).endOf('day').toDate();
//             break;

//         case 'week':
//             startDate = moment.utc(date).startOf('isoWeek').toDate();
//             endDate = moment.utc(date).endOf('isoWeek').toDate();
//             break;

//         case 'month':
//             startDate = moment.utc(date).startOf('month').toDate();
//             endDate = moment.utc(date).endOf('month').toDate();
//             break;

//         case 'year':
//             startDate = moment.utc(date).startOf('year').toDate();
//             endDate = moment.utc(date).endOf('year').toDate();
//             break;

//         default:
//             throw new Error('Invalid filter type. Use day, week, month, or year.');
//     }

//     if (filter === 'year') {
//         const records = await WorkoutGameStatuse.aggregate([
//             {
//                 $match: {
//                     user: new mongoose.Types.ObjectId(userId),
//                     date: { $gte: startDate, $lte: endDate }
//                 }
//             },
//             {
//                 $project: {
//                     date: 1,
//                     timeforplayGame: 1,
//                     timeforWorkout: 1,
//                     month: { $month: "$date" }
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     totalTimeForPlayGame: { $sum: "$timeforplayGame" },
//                     totalTimeForWorkout: { $sum: "$timeforWorkout" }
//                 }
//             },
//             {
//                 $sort: { _id: 1 }
//             }
//         ]);

//         return records.map(record => ({
//             monthName: monthNames[record._id - 1],
//             totalTimeForPlayGame: formatSeconds(record.totalTimeForPlayGame),
//             totalTimeForWorkout: formatSeconds(record.totalTimeForWorkout)
//         }));

//     } else {
//         const records = await WorkoutGameStatuse.aggregate([
//             {
//                 $match: {
//                     user: new mongoose.Types.ObjectId(userId),
//                     date: { $gte: startDate, $lte: endDate }
//                 }
//             },
//             {
//                 $project: {
//                     date: 1,
//                     timeforplayGame: 1,
//                     timeforWorkout: 1,
//                     dayOfWeek: { $dayOfWeek: "$date" },
//                     month: { $month: "$date" }
//                 }
//             },
//             {
//                 $sort: { date: -1 }
//             }
//         ]);

//         return records.map(record => ({
//             date: record.date,
//             timeforplayGame: formatSeconds(record.timeforplayGame),
//             timeforWorkout: formatSeconds(record.timeforWorkout),
//             dayName: dayNames[record.dayOfWeek - 1],
//             monthName: monthNames[record.month - 1]
//         }));
//     }
// };

const getWorkoutGameStatus = async (userId, filter, date) => {
    let startDate, endDate;

    // Allowed filter values


    // Validation for date
    if (!date) {
        throw new Error('Date parameter is required');
    }

    switch (filter) {
        case 'day':
            startDate = moment.utc(date).startOf('day').toDate();
            endDate = moment.utc(date).endOf('day').toDate();
            break;

        case 'week':
            startDate = moment.utc(date).startOf('isoWeek').toDate();
            endDate = moment.utc(date).endOf('isoWeek').toDate();
            break;

        case 'month':
            startDate = moment.utc(date).startOf('month').toDate();
            endDate = moment.utc(date).endOf('month').toDate();
            break;

        case 'year':
            startDate = moment.utc(date).startOf('year').toDate();
            endDate = moment.utc(date).endOf('year').toDate();
            break;
    }

    if (filter === 'year') {
        const records = await WorkoutGameStatuse.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
                    date: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $project: {
                    date: 1,
                    timeforplayGame: 1,
                    timeforWorkout: 1,
                    month: { $month: "$date" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    totalTimeForPlayGame: { $sum: "$timeforplayGame" },
                    totalTimeForWorkout: { $sum: "$timeforWorkout" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        return records.map(record => ({
            monthName: monthNames[record._id - 1],
            totalTimeForPlayGame: record.totalTimeForPlayGame,
            totalTimeForWorkout: record.totalTimeForWorkout
        }));

    } else {
        const records = await WorkoutGameStatuse.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
                    date: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $project: {
                    date: 1,
                    timeforplayGame: 1,
                    timeforWorkout: 1,
                    dayOfWeek: { $dayOfWeek: "$date" },
                    month: { $month: "$date" }
                }
            },
            {
                $sort: { date: -1 }
            }
        ]);

        return records.map(record => ({
            date: record.date,
            timeforplayGame:record.timeforplayGame,
            timeforWorkout: record.timeforWorkout,
            dayName: dayNames[record.dayOfWeek - 1],
            monthName: monthNames[record.month - 1]
        }));
    }
};





module.exports={
    workoutGameCreatore,
    getWorkoutGameStatus
}