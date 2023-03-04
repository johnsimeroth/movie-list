// TODO: use axios to:
// add post request to our DB
// add get request from TMDB
// add put request for when isWatched gets updated
import axios from 'axios';

const requests = function () {};
// let moviesCache = [];

requests.getMoviesFromMyDB = (callback) => {
  axios.get('/api/movies')
    .then(({ data }) => {
      console.log(data);
      callback(data);
    })
    .catch((err) => console.log('error getting movies from myDB: ', err));
};

requests.addMovieToMyDB = (movie, callback) => {
  axios.post('/api/movies', movie)
    .then((response) => callback(response))
    .catch((err) => console.log('error adding movie to myDB: ', err));
};

requests.updateMovieOnMyDB = (movie, callback) => {
  axios.put('/api/movies', movie)
    .then((response) => console.log(response.status))
    .catch((err) => console.log('error updating movie on myDB: ', err));
};

requests.getMoviesFromTMDB = () => {
  console.log('this feature is coming soon');
};

export default requests;