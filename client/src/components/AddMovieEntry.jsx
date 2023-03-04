import React from 'react';

const AddMovieEntry = ( { movie, clickCB }) => {
  console.log(movie);
  return (
    <div className="tmdb-movie-list" onClick={(e) => {clickCB(movie)}}>
      <img className='poster' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}></img>
      <div>
        {movie.title}
      </div>
    </div>
  );
}

export default AddMovieEntry;