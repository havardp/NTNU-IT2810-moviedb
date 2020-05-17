const mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema

// mongoDB models/schemas define how we want our tables to look like
// the model is then exported to the rest of the module


const movieSchema = new Schema({
  originalTitle: {
    type: String,
    unique: false,
  },
  genres: {
    type: [String],
    unique: false,
  },
  poster: {
    type: String,
    unique: false,
  },
  storyline:{
    type: String,
    unique: false,
  },
  year: {
    type: String,
    unique: false,
  },
  actors: {
    type: [String],
    unique: false,
  },
  duration: {
    type: String,
    unique: false,
  },
  contentRating: {
    type: String,
    unique: false,
  },
  imdbRating: {
    type: String,
    unique: false,
  },
})

module.exports = mongoose.model('Movie', movieSchema)
