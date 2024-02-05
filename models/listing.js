
//basic requires
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Review = require("./review.js")

 
//defining the schema of our Lisitng model(collection)
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,

  //it is the one-to-many link of review collection
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review",
  }],

  
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});


// this middleware runs after the exicution of findByIdAndDelete and delete the listing and the reviews 
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
})


//create and export the Listing model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
