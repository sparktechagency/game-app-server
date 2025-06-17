const express = require("express");
const config = require("../../config/config");
const authRoute = require("./auth.routes");
const userRoute = require("./user.routes");
const docsRoute = require("./docs.routes");
const subscriptionRoute=require('./subscription.routes')
const purchaseRouter=require('./purchase.routes')
const workoutGameStatus=require('./workoutGameStatus.route')
const speedTappingRouter=require('./speedTapping.routes')
const arrowGameRouter=require('./arrowGame.routes')
const picturematchingRouter=require('./picturematching.routes')
const mathquizRouter=require('./mathquize.routes')


const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/subscription",
    route: subscriptionRoute,
  },
  {
    path: "/purchase",
    route: purchaseRouter,
  },
  {
    path: "/wokout-game",
    route: workoutGameStatus,
  },
  {
    path: "/speed-tapping",
    route: speedTappingRouter,
  },
  {
    path: "/arrow-game",
    route: arrowGameRouter,
  },
  {
    path: "/picture-match",
    route: picturematchingRouter,
  },
  {
    path: "/math-quiz",
    route: mathquizRouter,
  },
 
];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
