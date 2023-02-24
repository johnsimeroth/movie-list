import React from 'react';
import MovieListEntry from './MovieListEntry.jsx';

const MovieList = ({movies, watchedCB}) => (
  <div className="movie-list">
    {movies.map((movie) => (
      <MovieListEntry key={movie.title}movie={movie} clickCB={watchedCB}/>
    ))}
  </div>
);

export default MovieList;