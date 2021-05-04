const mongoose = require('mongoose');
const Schema = mongoose.Schema; //this is actually a ctor that creates a new schema

const bookitemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    genreTags: {
      type: [String],
      required: true,
    },
    image: {
      type: String, //url
    },
    description: {
      type: String,
      required: true,
    },
    avgReviewScore: {
      type: Number,
    },
    reviews: {
      type: [String], //ids of reviews
    },
  },
  { timestamps: true }
);

const Bookitem = mongoose.model('Bookitem', bookitemSchema);
module.exports = Bookitem;
