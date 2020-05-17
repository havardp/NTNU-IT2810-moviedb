import React from "react";
import { GET_REVIEWS, ADD_REVIEW } from "../../queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { observer, useObservable } from "mobx-react-lite";
import styled from "styled-components";
import Loader from "../UI/Loader";
import Ratings from 'react-ratings-declarative';
import BottomScrollListener from "react-bottom-scroll-listener";

const ReviewList = styled.div`
  width: calc(100% + 2em);
  max-height: 30em;
  margin-right: -1em;
  margin-left: -1em;
  margin-bottom: -1em;
  overflow-y: scroll;

  .noreviews {
    padding: 1em;
  }
`

const ReviewListItem = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &:nth-child(odd) {
    background-color: #444444;
  }

  &:nth-child(even) {
    background-color: #222222;
  }

  .timestamp {
    font-size: 0.75em;
    color: #aaaaaa;
  }
`

const NewReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2em;

  .newReviewInput {
    background-color: #222222;
    padding-bottom: 1em;
  }

  .inputRating {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 1em;
  }
`

const Reviews = observer(({ movieId }) => {
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
    return <Loader />
  }

  if (error) {
    console.log("error");
    return <div>Error</div>
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
      <br />
      <h4>Write a review:</h4>
      <NewReviewWrapper>
        <textarea
          rows="2"
          cols="30"
          wrap="hard"
          className="newReviewInput"
          placeholde="New review"
          autoComplete="off"
          onChange={(e) => newReview.text = e.target.value} />
        <div className="inputRating">
        <Ratings
          rating={newReview.rating}
          widgetRatedColors={"red"}
          changeRating={(newRating) => newReview.rating = newRating}
          widgetDimensions="2em"
          widgetSpacings="0.25em">
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
        </Ratings>
        </div>
        <button
         className="btn btn-danger"
         disabled={(newReview.text === "" || newReview.rating === 0)}
         onClick={() => {
           addReview({
             variables: {
               movieId: movieId,
               rating: newReview.rating,
               text: newReview.text
             }
           })
           newReview.text = "";
           newReview.rating = 0;
         }}>
         Post
       </button>
      </NewReviewWrapper>
      <h4>Reviews:</h4>
      <BottomScrollListener onBottom={fetchMoreReviews} >
        {scrollRef => (
          <ReviewList ref={scrollRef}>
          {
            (data.reviews.length === 0) ? (<div className="noreviews"><i>No reviews</i></div>)
            : data.reviews.map((review) => (
              <ReviewListItem
                key={review.id}>
                <div>{review.text}<br /><i className="timestamp">{(new Date(review.timestamp)).toLocaleDateString()}</i></div>
                <Ratings
                  rating={review.rating}
                  widgetRatedColors={"red"}
                  widgetDimensions="1em"
                  widgetSpacings="0.25em">
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings></ReviewListItem>
            ))
          }
          </ReviewList>
        )}
      </BottomScrollListener>
    </>
  )
});

export default Reviews