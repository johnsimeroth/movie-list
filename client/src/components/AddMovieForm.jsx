import React from 'react';

const AddMovieForm = ({submitCB}) => (
  // <form onSubmit={submitCB} onChange={changeCB} value={value}>
  // <div className="add-movie-form boxes">
    <form onSubmit={submitCB} className="add-movie-form boxes">
      <input name="textfield" type="text" className="input add-input" placeholder="Add a movie" />
      <input type="submit" className="button add-submit" value="+" />
    </form>
  // </div>
);

export default AddMovieForm;