const mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema

// mongoDB models/schemas define how we want our tables to look like
// the model is then exported to the rest of the module


const reviewSchema = new Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: false,
  },
  rating: {
    type: mongoose.Schema.Types.Number,
    unique: false,
  },
  text: {
    type: String,
    unique: false,
  },
  timestamp: {
    type: Date,
    required: true,
  }
})

module.exports = mongoose.model('Review', reviewSchema)
