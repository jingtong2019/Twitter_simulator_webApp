const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  num_likes: {
    type: Number
  },
  retweets: {
    type: Number
  },
  views: {
    type: Number
  },
  date: {
    type: Date
  },
  _id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("tweet", tweetSchema);
