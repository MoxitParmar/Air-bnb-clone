// the basic requires
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const cookiParser = require("cookie-parser");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingcontroller = require("../controllers/listings.js");
// to parse multipart/form-data
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.use(cookiParser());

// index & create routes
//paste all the listing routes and replace the app with router
router
  .route("/")
  // here it is how we require the controller function
  .get(wrapAsync(listingcontroller.index))
  .post(
    isLoggedIn,
    // here it is the multer middleware for uploading image
    //here we can name this "listing[image]" to anything
    //we make the controller for access the path url image for this line
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingcontroller.createListing)
  );

//new route
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

// show , update , delete routes with the id
router
  .route("/:id")
  .get(wrapAsync(listingcontroller.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    // here it is the wrapAsync function call
    wrapAsync(listingcontroller.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingcontroller.destroyListing));

//Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingcontroller.renderEditForm)
);

//now export all the routes that we defined to app.js
module.exports = router;
