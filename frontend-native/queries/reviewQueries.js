import gql from 'graphql-tag'

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
