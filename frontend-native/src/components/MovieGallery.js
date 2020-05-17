import React, { useContext } from 'react';
import { Text, View, Button, ScrollView } from 'react-native'
import { useQuery } from "@apollo/react-hooks";
import { observer, useObservable } from 'mobx-react-lite'
import styled from 'styled-components'

import { GET_MOVIES } from "../../queries/movieQueries";
import QueryVariableStore from "../store/QueryVariableStore"
import MovieCard from "./MovieCard"

const CardWrapper = styled.View`
  flex: 1;
  align-Items: center;
  justify-Content: center;
`

const NoticeWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const MovieGallery = observer(({ navigation }) => {
  const store = useContext(QueryVariableStore);

  const fetchingMore = useObservable({
    loading: false
  });


  const { loading, error, data, fetchMore } = useQuery(GET_MOVIES, {
    variables: {
      originalTitle: store.search,
      sortBy: store.sort.columnName,
      orderBy: store.sort.order,
      yearFrom: store.year.from,
      yearTo: store.year.to,
      genres: store.genres
    }
  });

  if (loading) {
    return (
      <NoticeWrapper>
        <Text>loading!</Text>
      </NoticeWrapper>
    );
  }

  // If there happens to be an error we can console log it and return an error toast
  if (error) {
    return (
      <NoticeWrapper>
        <Text>error</Text>
      </NoticeWrapper>
    );
  }

  const fetchMoreMovies = () => {
    fetchMore({
      variables: {
        offset: data.movies.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        fetchingMore.loading = false;

        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          movies: [...prev.movies, ...fetchMoreResult.movies]
        });
      }
    });
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height
  };

  return (
    <ScrollView
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent) && !fetchingMore.loading) {
            fetchMoreMovies();
            fetchingMore.loading = true;
        }
      }}
      scrollEventThrottle={400}
      style={{height: "100%"}}
    >
      {
        (data.movies.length > 0) ? (
          <CardWrapper>
            {data.movies.map(movie => (
              <MovieCard movie={movie} key={movie.id} navigation={navigation}/>
            ))}
          </CardWrapper>
        ) : (
          <NoticeWrapper>
            <Text>No movies</Text>
          </NoticeWrapper>
        )
      }
    </ScrollView>
  );
})

export default MovieGallery;
