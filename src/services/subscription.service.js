
const httpStatus = require("http-status");
const { Subscription } = require("../models");
const Subscriber=require('../models/subscriber.model')



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
    console.log(sub,data,"this is sifs s ss s ss ");
     if (!sub) {
        throw new ApiError(httpStatus.NOT_FOUND, "subscription  not found");
      }
      sub.price=data.price|| sub.price
      
      sub.discountPrice=data.discountPrice|| sub.discountPrice
      
      
sub.save()

     return sub

}
// updte the subscription 
//----------------------------------------------

const updateSbuscriptionTrueFalse=async(data)=>{

    const sub=await Subscription.findById(data.id)
  
     if (!sub) {
        throw new ApiError(httpStatus.NOT_FOUND, "subscription  not found");
      }
      
      
      sub.isDiscount=data.isDiscount
      
sub.save()

     return sub

}

// show my earinging for the admin dashbord 
//---------------------------------------------------------
const showMyEarning = async () => {
  const allSubscriptions = await Subscriber.find();

  let monthEarning = 0;
  let yearEarning = 0;

  allSubscriptions.forEach(sub => {
    const priceToCount = sub.isDiscount ? sub.discountPrice : sub.price;
    if (sub.subscriptionType === "month") {
      monthEarning += priceToCount;
    } else if (sub.subscriptionType === "year") {
      yearEarning += priceToCount;
    }
  });

  return {
    totalEarning: monthEarning + yearEarning,
    monthEarning,
    yearEarning,
  };
};


module.exports={
    showSubscription,
    updateSbuscription,
    updateSbuscriptionTrueFalse,
    showMyEarning
}