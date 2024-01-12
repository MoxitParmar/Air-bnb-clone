const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
// const { listingSchema } = require("../schema.js");
// const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const cookiParser = require("cookie-parser");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingcontroller = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.use(cookiParser());

//middleware for joi errors
// const validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);

//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };

// index & create routes
router
  .route("/")
  .get(wrapAsync(listingcontroller.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingcontroller.createListing),

  );

//new route
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

// show , update , delete routes
router
  .route("/:id")
  .get(wrapAsync(listingcontroller.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingcontroller.updateListing),
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingcontroller.destroyListing));

//Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingcontroller.renderEditForm)
);

module.exports = router;
