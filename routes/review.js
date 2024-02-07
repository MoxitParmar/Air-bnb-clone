// this routes are the same as we defined in the lisitng routes
const express = require("express");
//this is the router object
// we write this params = true
//because it allows us to use the parant path id that we get on the app.js file
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
const { setMaxListeners } = require("connect-mongo");

//post review route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//Delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyreview)
);

module.exports = router;
