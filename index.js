var express = require('express');
var app = express();
var port = 3000;

// mustache config
var mustache = require('mustache-express');
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// body parser config
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// logger config 
var logger = require('morgan');
app.use(logger('dev'));

// method override config 
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

// express session 
var session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));


var teamsController = require('./controllers/teams_controller');
var leagueController = require('./controllers/leagues_controller');
// var usersController = require('./controllers/user_controller');
// var sessionsController = require('./controllers/session_controller');


app.use('/leagues', leagueController)
app.use('/teams', teamsController);
// app.use('/login', sessionsController)
// app.use('/users', usersController)
app.get('/', (req, res) => {
  res.render('./index');
})

app.listen(port, function () {
  console.log('---------------------------------------');
  console.log('Express listening on localhost:' + port);
  console.log('---------------------------------------');
})