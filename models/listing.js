const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    min: 0, // Ensure price is a non-negative number
    required: true, // You can make it optional if needed
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true, // Make sure the owner is mandatory, if needed
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'], // Only allows 'Point' as geometry type
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true, // Ensure that coordinates are provided
    },
  },
});

// Hook to delete reviews when the listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
