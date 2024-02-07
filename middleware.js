const Listing = require("./models/listing");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review");

//this is login check middleware
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //redirect url save for redirect to the page we wanted early on before the login by this res.locals variable
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", " you must be logged in to create listing!");
    return res.redirect("/login");
  }
  next();
};

//passport bydefault reset the local variable every time it do the successfull login
//so after login our variable has an emty value so we dont have any url in it to render
// so for saving that url we write this code
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

//this is the authanticator middleware
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// this is the schema validator middleware
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    // here in this line we print the additional error details if it has
    let errMsg = error.details.map((element) => (element.mess = age)).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// reveiw schema validator
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//reveiw authanticator
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "you did not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
