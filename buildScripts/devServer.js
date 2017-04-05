
/* eslint-disable no-console*/
/* eslint-disable no-unused-vars */
/** Note this file was designed for front end loading
/* @todo remove the express and other the application specific code
/* to a server side application file and load express there */
//import base libs that you will need for the application
import express from 'express';
import path from 'path';
import open from 'open';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
//import other libs
import {default as log} from '../src/server/core/logger'
//Add logger info
let logger = new log('info','error');
logger.consoleLevel = 'info';
import moment from 'moment';
//import movies routes
import moviesRoute from '../src/server/routes/moviestore';
import users from '../src/server/routes/users';
//import API's Here
import {default as actorAPI} from '../src/server/api/actors'

//Import Web Pack Here
import webpack from 'webpack';
import config from '../webpack.config.dev';




const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())

app.use(logger.dev);
app.use(logger.dev);

// parses request cookies, populating
// req.cookies and req.signedCookies
// when the secret is passed, used
// for signing the cookies.

app.use(cookieParser('foobars'));
// parses json, x-www-form-urlencoded, and multipart/form-data
//app.use(bodyParser());
app.set('view engine', 'ejs');

//Set Up app folders
app.use('/bower_components',express.static('bower_components'));
app.use('/css', express.static('src/client/public/styles'));
app.use('/images', express.static('src/client/public/images'));

//Get complier
const compiler = webpack(config);
//pass complier to
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
 /** Mount Api's Here */
//Actors Api
app.use('/api/actors', actorAPI )
 /** Mount Routes Here */
//mount movie store list
app.use('/movies', moviesRoute);

//Users Route
app.use('/users', users )
//cause error to occur
app.use('/test', function (req, res, next) {next('My bad')});
// dev error handler
app.use(function (err, req, res, next) {
  res.status(err['status'] || 500);
  if (err.message) {
    logger.log(err.message,'error');
    res.render('error', {
    message: err.message,
    error: err
  });
}
else {
  logger.log(err,'error');
  res.render('error', {
  message: err,
  error: err
});
}

})


app.listen(port, function(err) {
  if (err) {
    logger.log(err,'error');
  } else {
    open('http://localhost:' + port);
  }
});
