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

  // EVENT HANDLERS
  const addMovie = (e) => {
    e.preventDefault();
    const newMovie = {title: e.target.textfield.value, isWatched: false};
    // const newMovieList = [...movies, newMovie];
    // setMovies(newMovieList);

    // adds movie to database, then pulls down all movies from db so that all data fields stay in sync (e.g. the database auto-generated id)
    requests.addMovieToMyDB(newMovie, (response) => {
      requests.getMoviesFromMyDB(setMovies);
    });

    e.target.reset();
  };

  const updateWatched = (e, clickedMovie) => {
    var newMovieList = movies.map(movie => {return {...movie}});
    newMovieList.forEach(movie => {
      if (movie.title === clickedMovie.title) {
        movie.isWatched = !movie.isWatched;
      }
    })
    requests.updateMovieOnMyDB()
    setMovies(newMovieList); // as a callback passed into setMovies, send a put request to update clickedMovie's 'is watched' property on the db
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

