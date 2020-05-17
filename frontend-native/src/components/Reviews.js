import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components';
import { observer, useObservable } from 'mobx-react-lite';
import QueryVariableStore from "../store/QueryVariableStore";
import HistoryStore from "../store/HistoryStore";
import { GET_REVIEWS, ADD_REVIEW } from "../../queries/reviewQueries.js";
import { useQuery, useMutation } from "@apollo/react-hooks";

const ReviewWrapper = styled.View`

`;

const SingleReviewWrapper = styled.View`
  width: 100%;
  padding: 12px;
  padding-left: 16px;
  background-color: #333a;
  border-bottom-width: 0.5;
  border-bottom-color: #222;
`;

const ReviewText = styled.Text`
  color: #B22222;
  font-size: 16;
`;

const TimestampText = styled.Text`
  margin-top: 4px;
  color: #911111;
  font-size: 12;
`;

const ReviewHeader = styled.Text`
  margin: 16px;
  font-size: 18;
  font-weight: bold;
  color: #B22222;
`;

const LoadMoreWrapper = styled.View`
  align-items: center;
  padding: 16px;
`;

const LoadMoreText = styled.Text`
  color: #B22222;
  font-size: 16;
  font-weight: bold;
`;

const ReviewInputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-left: 16px;
  margin-right: 16px;
  border-bottom-color: red;
  border-bottom-width: 1px;
`;

const ReviewInput = styled.TextInput`
  background-color: #2a2a2a;
  width: 100%;
  color: red;
`;

const Reviews = observer(({movieId, scrollCallback}) => {
  //state for new review written by user
  const newReview = useObservable({
    rating: 0,
    text: ""
  });

  //query for reviews
  const { loading, error, data, fetchMore } = useQuery(GET_REVIEWS, {
    variables: {
      movieId: movieId
    }
  });

  //function for adding new review
  const [addReview] = useMutation(ADD_REVIEW, {
    update(cache, {data: { addReview }}) {
      //this updates the review chahe with the new review from ADD_REVIEW
      const { reviews } = cache.readQuery({ query: GET_REVIEWS, variables: {movieId: movieId} });
      cache.writeQuery({
        query: GET_REVIEWS,
        variables: {movieId: movieId},
        data: { reviews: [...[addReview], ...reviews]},
      });
    }
  });

  if (loading) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    )
  }

  if (error) {
    console.log("error");
    return (
      <View>
        <Text>Error: MovieID: {movieId}</Text>
      </View>
    )
  }

  //function for fetching more reviews when scroll to bottom
  const fetchMoreReviews = () => {
    fetchMore({
      variables: {
        offset: data.reviews.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return Object.assign({}, prev, {
          reviews: [...prev.reviews, ...fetchMoreResult.reviews]
        });
      }
    });
  };


  return (
    <>

      <ReviewHeader>
        Write a review
      </ReviewHeader>
      <ReviewInputWrapper>
        <ReviewInput
          onFocus={() => scrollCallback()}
          multiline={true}
          numberOfLines={3}
          onChangeText={text => newReview.text = text}
          value={newReview.text}/>
      </ReviewInputWrapper>
      <TouchableOpacity
        onPress={() => {
          if (newReview.text.trim() !== "") {
            addReview({
              variables: {
                movieId: movieId,
                rating: newReview.rating,
                text: newReview.text
              }
            });
          }
          newReview.text = "";
         }} >
        <LoadMoreWrapper>
          <LoadMoreText>
            Post
          </LoadMoreText>
        </LoadMoreWrapper>
      </TouchableOpacity>
      <ReviewHeader>
        Reviews
      </ReviewHeader>
      <ReviewWrapper>
        {
          data.reviews.map(review => (
            <SingleReviewWrapper
              key={review.id}>
              <ReviewText>
                {review.text}
              </ReviewText>
              <TimestampText>
                {(new Date(review.timestamp)).toLocaleDateString()}
              </TimestampText>
            </SingleReviewWrapper>
          ))
        }
      </ReviewWrapper>
      <TouchableOpacity
        onPress={fetchMoreReviews}>
        <LoadMoreWrapper>
          <LoadMoreText>
            Load more
          </LoadMoreText>
        </LoadMoreWrapper>
      </TouchableOpacity>
    </>
  );
});

export default Reviews;