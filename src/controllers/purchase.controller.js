
const httpStatus = require("http-status");
const { purchaseService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");


// make purchse controller
//------------------------------------------------------
const makePurchase=catchAsync(async(req,res)=>{
    const id=req.user._id

    const result=await purchaseService.makePurchase(id,req.body)
    console.log(result,id);

     // Return the success response
       res.status(httpStatus.CREATED).json(
        response({
          message: "purches the subscription ",
          status: "OK",
          statusCode: httpStatus.CREATED,
          data: result,
         
        }))
})






module.exports={
    makePurchase,
    
}