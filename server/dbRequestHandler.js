const db = require('./db.js');

module.exports = {

  getAll: (callback) => {
    const qryStr = 'SELECT * FROM movies';
    db.query(qryStr, (err, results) => callback(err, results));
  },

  create: (params, callback) => {
    const qryStr = 'INSERT INTO movies(title, is_watched) \
    VALUES(?, ?)';
    db.query(qryStr, params, (err, results) => callback(err, results));
  },

  update: (params, callback) => {
    const qryStr = 'UPDATE movies SET is_watched = ? WHERE id = ?';
    db.query(qryStr, params, (err, results) => callback(err, results));
  }

};


