const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


// get the listing data and pass it to the index.jsx file
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  // let responce = await geocodingClient
  //   .forwardGeocode({
  //     query: req.body.listing.location,
  //     limit: 1,
  //   })
  //   .send();

  
  let { id } = req.params;
  // get the data for that listing id
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner")

  if (!listing) {
    req.flash("error", " searched listing does not exist");
    // res.redirect("/listings");
  }
  //pass that listing data to show.ejs
  res.render("listings/show.ejs", { listing });
};

//this controller has the data from the new.ejs form and we add new listing by this code
module.exports.createListing = async (req, res, next) => {
  let responce = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();
    console.log(responce.body.features[0].geometry)
  // if (!req.body.listing) {
  //   throw new ExpressError (400, "send valid data for listing")
  // }

  // the server side validation code
  // let result = listingSchema.validate(req.body);
  // console.log(result);
  // if (result.error) {
  //   throw new ExpressError(400, result.error)
  // }
  
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename }; 
  newListing.geometry = responce.body.features[0].geometry
  let savedListng = await newListing.save();
  // console.log(savedListng)
  req.flash("success", "new listing created");
  res.redirect("/listings");
};


// this code render the edit form that we pass the data to the update method
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", " searched listing does not exist");
    res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};


//here it is how we update the listings
module.exports.updateListing = async (req, res) => {

  //this three line is for backend error handling
  // if (!req.body.listing) {
  //   throw new ExpressError (400, "send valid data for listing")
  // }

  

  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  
  // Listing.geometry = responce.body.features[0].geometry
  // console.log(Listing.geometry)

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    
    await listing.save();
  }
  req.flash("success", "listing updated");

  
  // console.log(responce.body.features[0].geometry)
  res.redirect(`/listings/${id}`);
};


//here it is how we delete a listing
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "listing deleted");
  res.redirect("/listings");
};
