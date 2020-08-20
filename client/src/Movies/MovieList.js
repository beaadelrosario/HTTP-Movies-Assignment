import React from "react";
import { Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList(props) {
  const { movies } = props;
  const history = useHistory();

  const goToAddMovie = () => {
    history.push('/add-movie')
  }

  return (
    <div className="movie-list">
      <button
        onClick={() => history.push(`/add-movie`)}
        className="add-movie"
      >Add a Movie</button>
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard 
            movie={movie}
            getMovieList={props.getMovieList}
            />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
