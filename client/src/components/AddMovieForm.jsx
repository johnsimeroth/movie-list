import React from 'react';
import { useState } from 'react';
import AddMovieEntry from './AddMovieEntry.jsx'
import requests from './clientRequestHandler.js';

// TODO: add live-search of TMDB while typing so users can select movies with pre-filled info

const AddMovieForm = ({submitCB}) => {
  // STATES REFS AND EFFECTS
  const [addMovieList, setAddMovieList] = useState([]);

  // EVENT HANDLERS
  let timer = null;
  const searchTMDB = (e) => {
    e.persist();
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('running');
      requests.searchMoviesFromTMDB(e.target.value, setAddMovieList);
    }, 500);
  }

  const handleClick = (movie) => {
    console.log(movie);
    requests.getMovieDetailsFromTMDB(movie.id, submitCB);
    // submitCB(movie);
  }

  // JSX ELEMENT TO RENDER
  return (
    <div>
      <form onSubmit={submitCB} className="add-movie-form boxes">
        <input name="textfield" type="text" className="input add-input" placeholder="Add a movie to your list" onChange={(e)=>searchTMDB(e)} />
        <input type="submit" className="button add-submit" value="+" />
      </form>
      <ul className="add-dropdown">
        {addMovieList.map(movie => (
        <AddMovieEntry key={movie.id} movie={movie} clickCB={handleClick}/>)
        )}
      </ul>
    </div>
  )
};

export default AddMovieForm;