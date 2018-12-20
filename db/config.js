// configure postgres to connect our db to our express app
var pgPromise = require('pg-promise');
var pgInstance = pgPromise();

var config = {
  host: 'localhost',
  port: 5432,
  database: 'project_scores',
  user: 'postgres', // your username here!!
  password: 8899253
}

var connection = pgInstance(config);

module.exports = connection;