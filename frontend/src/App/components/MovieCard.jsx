import React, { useContext, useEffect } from "react";
import { GET_ADDITIONAL_INFO } from "../../queries";
import { useLazyQuery } from "@apollo/react-hooks";
import { observer, useObservable } from 'mobx-react-lite'
import styled from 'styled-components'
import Modal from 'react-responsive-modal';
import ModalStatus from "../store/ModalStore.js"
import Reviews from "../components/Reviews.jsx"


const FlipCard = styled.div`
  background-color: transparent;
  width: 300px;
  height: 400px;
  perspective: 1000px;
  margin-top: 120px;

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  &:hover .flip-card-inner {
    transform: rotateY(180deg);
  }


  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .flip-card-front {
    color: black;
  }

  .flip-card-back {
    background-color: #222222;
    color: white;
    transform: rotateY(180deg);
    padding-top: 60px;

  div{
    padding: 4px;
  }

  .header{
    font-size: 16px;
    padding-bottom: 30px;
    font-weight: bold;
  }

  .button{
    margin-top: 50px;
    padding: 10px 30px;
  }
}
`

const Row = styled.div`
  padding-bottom: 5px;
`

const MovieCard = observer(({ movie }) => {
  //using a local store for the fetched image of each movie here
  const imageStore = useObservable({
    data: ""
  })

  //storing movie.id in the store if button for more info is clicked, and shows modal for the movie whose id it belongs
  const store = useContext(ModalStatus)

  //query to get aditional info about the movie where the user has clicked the button
  const [getAdditionalInfo, { loading, called, data }] = useLazyQuery(GET_ADDITIONAL_INFO, {
    variables: {
      id: movie.id
    }
  });

  //fetching the poster for the movie from the public folder
  useEffect(() => {
    fetch("img/" + movie.poster, {cache: "force-cache", mode: "same-origin"})
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          imageStore.data = (reader.result);
        };
      })
      .catch(err => console.error(err))
  }, [movie.poster]);

  return (
    <div className="col-6 col-sm-6 col-lg-4">
      <Modal open={store.show === movie.id} onClose={() => store.show = ""} center styles={{modal: {background: "#222222", color: "white", padding: "1em"}}}>
        {called && !loading &&
          <>
            <h1>{movie.originalTitle}</h1>
            <Row>Genres: {movie.genres.map((genre, index) =>(index ? ', ' : '') + genre )}</Row>
            <Row>Notable actors: {movie.actors.map((actor, index) =>(index ? ', ' : '') + actor )}</Row>
            <div>Plot: {data.movie.storyline}</div>
            <Reviews movieId={movie.id}/>
          </>
        }
      </Modal>
      <center>
        <FlipCard>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img
                src={imageStore.data}
                style={{ height: "400px", width: "300px" }}
                alt="can't find img src"
              />
            </div>
            <div className="flip-card-back">
              <div className="header">Movie title: {movie.originalTitle}</div>
              <div>Year Released: {movie.year}</div>
              <div>Play time: {movie.contentRating === "" ? "Not found" : (movie.duration.substr(2) + "inutes")}</div>
              <div>Content rating: {movie.contentRating === "" ? "Not found" : movie.contentRating}</div>
              <div>IMDB user rating: {movie.imdbRating === "" ? "Not found" : movie.imdbRating}</div>
              <button type="button" className="btn btn-danger button" onClick={() => {
                store.show = movie.id
                getAdditionalInfo();
              }}>Get Additional Info</button>
            </div>
          </div>
        </FlipCard>
      </center>
    </div>
  );
})

export default MovieCard
