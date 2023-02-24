import React from 'react';
import { useState, useEffect, useRef } from 'react';

import MovieList from './MovieList.jsx';
import Search from './Search.jsx';
import AddMovieForm from './AddMovieForm.jsx';

const defaultMovies = [];

const App = (props) => {

  const [movies, setMovies] = useState(defaultMovies);
  const [matchedMovies, setMatchedMovies] = useState(movies);
  const [toggle, setToggle] = useState(false);
  const searchRef = useRef(null);
  // React.useEffect(() => {
  //   filterMovies()
  // }, [movies, toggle])

  const addMovie = (e) => {
    e.preventDefault();
    const newMovie = {title: e.target.textfield.value, isWatched: false};
    const newMovieList = [...movies, newMovie];
    setMovies(newMovieList);
    filterMovies(newMovieList);
    e.target.reset();
  };



  const updateWatched = (e, clickedMovie) => {
    var newMovieList = movies.map(movie => {return {...movie}});
    newMovieList.forEach(movie => {
      // issue with this line: if there are duplicate movie titles, they'll all get switched to watched. should add unique IDs to fix this. or only allow unique titles via set, or object, which would fix the need for this loop, but unsure if that works with map call in movielist component.
      if (movie.title === clickedMovie.title) {
        movie.isWatched = !movie.isWatched;
      }
    })
    setMovies(newMovieList);
    filterMovies(newMovieList);
  }

  const handleToggle = (e) => {
    var notToggle = !toggle;
    setToggle(notToggle);
    filterMovies(movies, notToggle);

  }

  const searchTest = (movie) => movie.title.toLowerCase().includes(searchRef.current.value.toLowerCase());
  const watchedTest = (movie) => movie.isWatched === false;
  const filterMovies = (moviesToFilter, forceToggle) => {
    // setMatchedMovies(moviesToFilter.filter(movie => (tests.every(test => test(movie)))));
    // ^ iterates through a variable number of filter test functions, and returns true only for movies that return true for every test
    // really slick, but not actually needed here. If switching back, add ...tests to params. But think I'll do this instead:
    forceToggle = forceToggle || toggle;
    const test = forceToggle ? (movie) => (searchTest(movie) && watchedTest(movie)) : searchTest;
    setMatchedMovies(moviesToFilter.filter(test));
  };

  return (
    <div>
      <AddMovieForm submitCB={addMovie} />
      <Search searchRef={searchRef} changeCB={(e) => filterMovies(movies)} toggle={toggle} toggleCB={handleToggle} />
      <MovieList movies={matchedMovies} watchedCB={updateWatched} />
    </div>
  )
};

export default App;

