import React from 'react';
// import { useRef } from 'react';

const Search = ({searchRef, changeCB, toggle, toggleCB}) => {
  var buttonText;
  if (toggle) {
    buttonText = 'Search all';
  } else {
    buttonText = 'Only unwatched';
  }

return (
    <div>
      <input ref={searchRef} type="text" className="searchbar boxes input" placeholder="Find a movie" onChange={changeCB}/>
      <button onClick={toggleCB} >{buttonText}</button>
    </div>
  );
};

export default Search;