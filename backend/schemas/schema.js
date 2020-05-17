const graphql = require('graphql')
const Movie = require('../models/movie')
const Review = require('../models/review')
const {GraphQLDateTime} = require('graphql-iso-date');

const {
  GraphQLObjectType, GraphQLString,
  GraphQLID, GraphQLInt,GraphQLSchema,
  GraphQLList,GraphQLNonNull
  } = graphql



//Schema defines data on the Graph like object types(movie type), relation between
//these object types and describes how it can reach into the graph to interact with
//the data to retrieve or mutate the data

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    originalTitle: { type: GraphQLString },
    poster: { type: GraphQLString },
    storyline: {type: GraphQLString},
    year: {type: GraphQLString},
    genres: {type: new GraphQLList(GraphQLString)},
    actors: {type: new GraphQLList(GraphQLString)},
    duration: {type: GraphQLString},
    contentRating: {type: GraphQLString},
    imdbRating: {type: GraphQLString},
  })
});

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: { type: GraphQLID },
    movieId: { type: GraphQLID },
    rating: { type: GraphQLInt },
    text: {type: GraphQLString },
    timestamp: {type: GraphQLDateTime},
  })
});

const GenreCountType = new GraphQLObjectType({
  name: "GenreCount",
  fields: () => ({
    genre: { type: GraphQLString },
    count: { type: GraphQLInt }
  })
});

const YearCountType = new GraphQLObjectType({
  name: "YearCount",
  fields: () => ({
    year: { type: GraphQLInt },
    count: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
      movie: {
          type: MovieType,
          //argument passed by the user while making the query
          args: { id: { type: GraphQLID } }, //had to change this to a string to make the query work from the website, it worked as graphqlid on graphiql all the time
          resolve(parent, args) {

              //this will return the movie with id passed in argument by the user
              return Movie.findById(args.id)
          }
      },
      movies: {
        // this query returns all movies
        type: new GraphQLList(MovieType),
        args: {originalTitle: {type: GraphQLString }, offset: {type: GraphQLInt}, sortBy: { type: GraphQLString }, orderBy: { type: GraphQLString }, yearFrom: { type: GraphQLString }, yearTo: { type: GraphQLString }, genres: { type: GraphQLString } },
        // The resolver does a regex match to the Movies name field
        // options flagged with 'i' marks the regex match as case insensitive
        resolve(parent, args) {
            let queryBySearch = {
              originalTitle: {"$regex": args.originalTitle, '$options': 'i'},
              year: {$gte: args.yearFrom, $lte: args.yearTo},
              genres: {"$regex": args.genres, '$options': 'i'}
            }
            let queryBySortBy = {
              [args.sortBy]: args.orderBy,
            }
            return Movie.find(queryBySearch).sort(queryBySortBy).skip(args.offset).limit(9)
        }
      },
      reviews: {
        //this query returns all review for a movie
        type: new GraphQLList(ReviewType),
        args: {movieId: { type: new GraphQLNonNull(GraphQLID) }, offset: {type: GraphQLInt}},

        resolve(parent, args) {
          return Review.find({
            movieId: args.movieId
          }).sort({
            timestamp: "desc"
          }).skip(args.offset).limit(10);
        }
      },
    yearCount: {
      type: new GraphQLList(YearCountType),

      resolve(parent, _) {
        return Movie.aggregate([
          {"$group" : {_id:"$year", count:{$sum:1}}},
          {"$project": {year: {"$toInt": "$_id"}, count: "$count", _id: false}},
          {"$sort": {year: 1}}
        ]);
      }
    },
    genreCount: {
      type: new GraphQLList(GenreCountType),

      resolve(parent, _) {
        return Movie.aggregate([
          {"$project": {genres: "$genres"}},
          {"$unwind": "$genres"},
          {"$group" : {_id:"$genres", count:{$sum:1}}},
          {"$project": {genre: "$_id", count: "$count", _id: false}},
          {"$sort": {count: 1}}]);
      }
    }
  }
})


// Root mutation object. Mutations are how we alter/add objects through
// the graphQL API
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMovie: { //this mutation should probably be removed, as it is not used
      type: MovieType,
      args: {
       name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let movie = new Movie({
          name: args.name
        })
        return movie.save()
      }
    },
    addReview: {
      type: ReviewType,
      args: {
        movieId: { type: new GraphQLNonNull(GraphQLID) },
        rating: { type: GraphQLInt },
        text: { type: GraphQLString }
      },
      resolve(parent, args) {
        let review = new Review({
          movieId: args.movieId,
          rating: args.rating,
          text: args.text,
          timestamp: Date.now()
        });
        return review.save();
      }
    }
  }
})



// The query and mutation objects are then registered to the root schema
// which makes them available to the API
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
