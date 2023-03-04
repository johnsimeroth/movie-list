// SERVER SIDE REQUEST HANDLING GOES IN THIS FILE
const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const cors = require('cors');
const dbReq = require('./dbRequestHandler.js');

// const movies = [
//   {title: 'tenet', isWatched: false, director: 'nolan'},
//   {title: 'revenant', isWatched: false, director: 'yerboi'},
//   {title: 'Goodfellas', isWatched: true, director: 'scorsese'},
// ];

app.use(cors());
app.use(express.json());
app.use(express.static('client/dist'));

app.get('/api/movies', (req, res, next) => {
  dbReq.getAll((err, results) => {
    if (err) {return console.log('ERROR getting movies from database')}
    res.json(results);
  });
});

app.post('/api/movies', (req, res) => {
  const params = [req.body.title, req.body.isWatched];
  dbReq.create(params, (err, results) => {
    if (err) {return console.log('ERROR adding movie to database')}
    res.sendStatus(201);
  });
});

app.put('/api/movies/:id', (req, res) => {
  const params = [(req.body.isWatched), parseInt(req.params.id)];
  dbReq.update(params, (err, results) => {
    if (err) {return console.log('ERROR updating movie on database', err)}
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to get started`);
})