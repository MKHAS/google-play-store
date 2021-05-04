const mongoose = require('mongoose');
const Schema = mongoose.Schema; //this is actually a ctor that creates a new schema

const appuserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    library: {
      type: [String],
    },
    reviews: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Appuser = mongoose.model('Appuser', appuserSchema);
module.exports = Appuser;
