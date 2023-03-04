import React from 'react';
import { useState, useEffect, useRef } from 'react';

import MovieList from './MovieList.jsx';
import Search from './Search.jsx';
import AddMovieForm from './AddMovieForm.jsx';
import requests from './clientRequestHandler.js';

const defaultMovies = [];

/*
OTHER STUFF TO ADD:
Think about when it makes sense to request this information from the api - when the user clicks on the title? When the movie gets added? Refactor your code as necessary.
Add a way for the user to add their own rating
Add a sorting mechanism so the user can sort on rating or other properties
Refactor search to allow users to search for movies with a specific director or actor/actress
Refactor add movie to search for movies that exist
*/

const App = (props) => {

  // STATES, REFS, AND EFFECTS
  const [movies, setMovies] = useState(defaultMovies);
  const [matchedMovies, setMatchedMovies] = useState(movies);
  const [toggle, setToggle] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => { filterMovies() }, [movies, toggle]);
  useEffect(() => { requests.getMoviesFromMyDB(setMovies) }, []);
  // useEffect(() => { requests.searchMoviesFromTMDB('jack+reacher',
  // (results)=> {
  //   console.log(results[0].id);
  //   requests.getMovieDetailsFromTMDB(results[0].id, console.log)
  // })}, []);

  // EVENT HANDLERS
  const addMovie = (movie) => {
    // e.preventDefault();
    const newMovie = {title: e.target.textfield.value, isWatched: false};
    requests.addMovieToMyDB(newMovie, refreshMoviesFromDB);
    e.target.reset();
  };

  const updateWatched = (e, clickedMovie) => {
    let updatedMovie = movies.filter(movie => movie.id === clickedMovie.id)[0];
    updatedMovie = {...updatedMovie}; // makes a copy
    updatedMovie.isWatched = !updatedMovie.isWatched;
    requests.updateMovieOnMyDB(updatedMovie, (response) => {requests.getMoviesFromMyDB(setMovies)})
  }

  const refreshMoviesFromDB = (response) => {requests.getMoviesFromMyDB(setMovies)}

  const handleToggle = (e) => {setToggle(!toggle);}

  const filterMovies = () => {
    const searchTest = (movie) => movie.title.toLowerCase().includes(searchRef.current.value.toLowerCase());
    const watchedTest = (movie) => movie.isWatched === false;
    const test = toggle ? (movie) => (searchTest(movie) && watchedTest(movie)) : searchTest;
    setMatchedMovies(movies.filter(test));
  };


  // JSX ELEMENT TO RENDER
  return (
    <div>
      <AddMovieForm submitCB={addMovie} />
      <Search searchRef={searchRef} changeCB={filterMovies} toggle={toggle} toggleCB={handleToggle} />
      <MovieList movies={matchedMovies} watchedCB={updateWatched} />
    </div>
  )
};

export default App;

