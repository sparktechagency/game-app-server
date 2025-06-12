
const subscription = require("../models/subscription")

// show the service of the subscrition 
//---------------------------------------------------------
const showSubscription=async()=>{

   const result = await subscription.find().select('subscriptionType price isDiscount discountPrice').lean();

    return result

}

module.exports={
    showSubscription
}