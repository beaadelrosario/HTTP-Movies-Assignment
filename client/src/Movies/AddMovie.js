import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialFormValues = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
  addedStar: "",
};

const AddMovie = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const history = useHistory();

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const addStar = (e) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      addedStar: "",
      stars: [...formValues.stars, formValues.addedStar],
    });
  };

  const postNewMovie = (e) => {
    e.preventDefault();
    const postData = {
      title: formValues.title,
      director: formValues.director,
      metascore: formValues.metascore,
      stars: formValues.stars,
    };
    axios
      .post("http://localhost:5000/api/movies", postData)
      .then((res) => {
        props.getMovieList();
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formValues.title}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={formValues.director}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="text"
          name="metascore"
          placeholder="Metascore"
          value={formValues.metascore}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="text"
          name="addedStar"
          placeholder="Movie Stars"
          value={formValues.addedStar}
          onChange={handleChange}
        />
        <button onClick={addStar}>+</button>
      </form>
      {formValues.stars.map((star) => {
          return <div>
              {star}
          </div>
      })}
      <button onClick={postNewMovie}>Add Movie</button>
      <br></br>
    </>
  );
};
export default AddMovie;
