import gql from 'graphql-tag'

export const GET_MOVIES = gql`
  query Movie($originalTitle: String!, $offset: Int, $sortBy: String, $orderBy: String, $yearFrom: String, $yearTo: String, $genres: String){
    movies(originalTitle: $originalTitle, offset: $offset, sortBy: $sortBy, orderBy: $orderBy, yearFrom: $yearFrom, yearTo: $yearTo, genres: $genres){
      id
      originalTitle
      year
      genres
      actors
      poster
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
