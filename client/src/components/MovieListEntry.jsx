import React from 'react';

const MovieListEntry = ({movie, clickCB}) => {

  // TODO: add state control for extra panel of info
  // TODO: assign return div to a var, and wrap return statement
  // in a conditional, return as-is or with extra panel of info,
  // depending on clicked state
  // TODO: hide button inside extra panel

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