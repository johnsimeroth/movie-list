import React from 'react';

const MovieListEntry = ({movie, clickCB}) => {

  var buttonText;
  if (movie.isWatched) {
    buttonText = 'Watched!';
  } else {
    buttonText = 'Mark as watched';
  }

  return (
    <div className="movie-entries boxes">
      <div>
        {movie.title}
      </div>
      <button className="button" onClick={(e) => clickCB(e, movie)}>{buttonText}</button>
    </div>
  );

};


export default MovieListEntry;