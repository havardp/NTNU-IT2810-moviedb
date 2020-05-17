import React, { useContext } from "react";
import { GET_MOVIES } from "../../queries";
import { useQuery } from "@apollo/react-hooks";
import { observer } from 'mobx-react-lite'
import BottomScrollListener from "react-bottom-scroll-listener"; //can use callback when scrolled to bottom of page
import QueryVariableStore from "../store/QueryVariableStore"
import MovieCard from "../components/MovieCard.jsx";
import Loader from "../UI/Loader";

//using observer, which means that every time the mobx store variables are updated, the component will rerender
const MovieGallery = observer(() => {
  const store = useContext(QueryVariableStore)

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

  // While the query is loading we can return a Loader component
  if (loading) {
    return <Loader />;
  }

  // If there happens to be an error we can console log it and return an error toast
  if (error) {
    console.log(error);
    return <div>Error</div>; // Todo toasts/alerts
  }
  // If loading or error is true, then the component will always stop at the function return point
  // therefore if we are at this point in the component we have successfully fetched data

  //this is the function we call when we have scrolled to the bottom, which updates the query with a new offset, which lets us load 9 more movies
  const fetchMoreMovies = () => {
    fetchMore({
      variables: {
        offset: data.movies.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          movies: [...prev.movies, ...fetchMoreResult.movies]
        });
      }
    });
  };

  return (
    <>
      <div id={"movieGallery"}>
        {data.movies.map(movie => (
          <div data-cy="movieCard" key={movie.id}>
            <MovieCard movie={movie}/>
          </div>
        ))}
      </div>
      <BottomScrollListener onBottom={fetchMoreMovies} />
    </>

  )
})

export default MovieGallery
