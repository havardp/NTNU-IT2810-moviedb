import gql from 'graphql-tag'

export const GET_MOVIES = gql`
  query Movie($originalTitle: String!, $offset: Int, $sortBy: String, $orderBy: String, $yearFrom: String, $yearTo: String, $genres: String){
    movies(originalTitle: $originalTitle, offset: $offset, sortBy: $sortBy, orderBy: $orderBy, yearFrom: $yearFrom, yearTo: $yearTo, genres: $genres){
      id
      originalTitle
      poster
      year
      genres
      actors
      duration
      contentRating
      imdbRating
    }
  }
`

export const GET_ADDITIONAL_INFO = gql`
  query Movie($id: ID!){
    movie(id: $id){
      storyline
    }
  }
`

export const GET_REVIEWS = gql`
  query GetReviews($movieId: ID!, $offset: Int) {
    reviews(movieId: $movieId, offset: $offset) {
      id
      movieId
    	rating
      text
      timestamp
    }
  }
`

export const ADD_REVIEW = gql`
  mutation AddReview($movieId: ID!, $rating: Int, $text: String) {
    addReview(movieId: $movieId, rating: $rating, text: $text) {
      id
      movieId
      rating
      text
      timestamp
    }
  }
`

export const GET_YEAR_COUNT = gql`
  query GetYearCount {
    yearCount {
      year
      count
    }
  }
`

export const GET_GENRE_COUNT = gql`
  query GetGenreCount {
    genreCount {
      genre
      count
    }
  }
`
