import gql from 'graphql-tag'

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
