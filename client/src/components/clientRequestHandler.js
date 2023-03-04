// TODO: use axios to:
// add get request from TMDB
import axios from 'axios';
import tmdbAPIKey from '../../config.js';

const requests = function () {};
// let moviesCache = [];

requests.getMoviesFromMyDB = (callback) => {
  axios.get('/api/movies')
    .then(({ data }) => {
      const formattedMovies = data.map((movie) => {
        movie.isWatched = !!movie.is_watched;
        delete movie.is_watched;
        return movie;
      });
      callback(formattedMovies);
    })
    .catch((err) => console.log('error getting movies from myDB: ', err));
};

requests.addMovieToMyDB = (movie, callback) => {
  axios.post('/api/movies', movie)
    .then((response) => callback(response))
    .catch((err) => console.log('error adding movie to myDB: ', err));
};

requests.updateMovieOnMyDB = (movie, callback) => {
  axios.put(`/api/movies/${movie.id}`, movie)
    .then((response) => callback(response))
    .catch((err) => console.log('error updating movie on myDB: ', err));
};

requests.searchMoviesFromTMDB = (query, callback) => {
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbAPIKey}&query=${query}&include_adult=false`)
    .then(({ data }) => (callback(data.results)))
    .catch((err) => console.log('error searching titles on TMDB: ', err))
};

requests.getMovieDetailsFromTMDB = (movieID, callback) => {
  console.log(`movieID: ${movieID}`)
  axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${tmdbAPIKey}`)
    .then(({ data }) => (callback(data)))
    .catch((err) => console.log('error getting details on TMDB: ', err))
};

export default requests;