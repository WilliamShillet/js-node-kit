
/* eslint-disable no-console*/
/* eslint-disable no-unused-vars */
/** Note this file was designed for front end loading
/* @todo remove the express and other the application specific code
/* to a server side application file and load express there */
//import base libs that you will need for the application
import express from 'express';
import path from 'path';
import open from 'open';
//import other libs
import logger from 'morgan';
import cookieParser from 'cookie-parser';
//import bodyParser from 'body-parser';

//Import Web Pack Here
import webpack from 'webpack';
import config from '../webpack.config.dev';
import moment from 'moment';
import {default as templateService} from '../src/server/api/templateService';

const port = 3000;
const app = express();
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
app.use('/app', express.static('src/client/app'));
app.use('/css', express.static('src/client/public/styles'));
app.use('/images', express.static('src/client/public/images'));

//Get complier
const compiler = webpack(config);
//pass complier to
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.get('/template', function(req, res){
    res.send(templateService.say());

});
app.post('/template', function(req, res){


  res.redirect('back');
});

app.get('/users', function(req, res) {

});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
