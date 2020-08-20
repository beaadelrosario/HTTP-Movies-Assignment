import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const initialFormValues = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovieForm = (props) => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState(initialFormValues);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        setFormValues(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formValues)
      .then((res) => {
        console.log(res);
        props.movieList.filter(movie => movie.id !== id );
        props.setMovieList([...props.movieList, res.data]);
        props.getMovieList();
        history.push(`/movies/${id}`)
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <h1>Update Movie</h1>
        <label htmlFor="title">Title:&nbsp;</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="director">Director:&nbsp;</label>
        <input
          type="text"
          id="director"
          name="director"
          value={formValues.director}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="metascore">Metascore:&nbsp;</label>
        <input
          type="number"
          id="metascore"
          name="metascore"
          value={formValues.metascore}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="stars">Stars:&nbsp;</label>
        <button>Submit changes</button>&nbsp;
      </form>
    </div>
  );
};

export default UpdateMovieForm;
