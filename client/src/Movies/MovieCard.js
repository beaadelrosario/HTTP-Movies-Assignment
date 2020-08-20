import React from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const MovieCard = (props) => {
  const { id, title, director, metascore, stars } = props.movie;
  const history = useHistory();

  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res)
        props.getMovieList()
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
    </div>
    <button onClick={deleteMovie}>Delete</button>
    </>
  );
};

export default MovieCard;
