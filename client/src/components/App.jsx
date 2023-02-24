import React from 'react';
import { useState, useEffect, useRef } from 'react';

import MovieList from './MovieList.jsx';
import Search from './Search.jsx';
import AddMovieForm from './AddMovieForm.jsx';

const defaultMovies = [];

const App = (props) => {

  // STATES, REFS, AND EFFECTS
  const [movies, setMovies] = useState(defaultMovies);
  const [matchedMovies, setMatchedMovies] = useState(movies);
  const [toggle, setToggle] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => {filterMovies()}, [movies, toggle]);


  // EVENT HANDLERS
  const addMovie = (e) => {
    e.preventDefault();
    const newMovie = {title: e.target.textfield.value, isWatched: false};
    const newMovieList = [...movies, newMovie];
    setMovies(newMovieList);
    e.target.reset();
  };

  const updateWatched = (e, clickedMovie) => {
    var newMovieList = movies.map(movie => {return {...movie}});
    newMovieList.forEach(movie => {
      if (movie.title === clickedMovie.title) {
        movie.isWatched = !movie.isWatched;
      }
    })
    setMovies(newMovieList);
  }

  const handleToggle = (e) => {setToggle(!toggle);}

  const filterMovies = () => {
    const searchTest = (movie) => movie.title.toLowerCase().includes(searchRef.current.value.toLowerCase());
    const watchedTest = (movie) => movie.isWatched === false;
    const test = toggle ? (movie) => (searchTest(movie) && watchedTest(movie)) : searchTest;
    setMatchedMovies(movies.filter(test));
  };


  // JSX RETURN ELEMENT
  return (
    <div>
      <AddMovieForm submitCB={addMovie} />
      <Search searchRef={searchRef} changeCB={filterMovies} toggle={toggle} toggleCB={handleToggle} />
      <MovieList movies={matchedMovies} watchedCB={updateWatched} />
    </div>
  )
};

export default App;

