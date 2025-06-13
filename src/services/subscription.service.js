
const httpStatus = require("http-status");
const { Subscription } = require("../models");


// show the service of the subscrition 
//---------------------------------------------------------
const showSubscription=async()=>{

   const result = await Subscription.find().select('subscriptionType price isDiscount discountPrice').lean();

    return result

}

// updte the subscription 
//----------------------------------------------

const updateSbuscription=async(data)=>{

    const sub=await Subscription.findById(data.id)
     if (!sub) {
        throw new ApiError(httpStatus.NOT_FOUND, "subscription  not found");
      }
      sub.price=data.price|| sub.price
      sub.isDiscount=data.isDiscount|| sub.isDiscount
      sub.discountPrice=data.discountPrice|| sub.discountPrice
      
sub.save()

    // return result

}

module.exports={
    showSubscription,
    updateSbuscription
}