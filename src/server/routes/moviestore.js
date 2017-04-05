import express from 'express';
import  {default as MovieService, Controller}  from '../api/movieapi';
import {default as Logger} from '../../server/core/logger'

let router = express.Router();
let movieService = new MovieService();
let logger = new Logger();
router.use((req, res, next) => {
  logger.log('invoking movie store route.','info');
  next();
});

//do not define next if you are not going to use it
//unless it is an error handling function
router.get('/list', function(req, res) {
   logger.log('getting movie list.','debug');
    let hmtl = Controller.renderHomeView(movieService.get().list);
    logger.log('sending movie list.','debug');
  res.send(hmtl);
});

router.get('/genre/:id', lookupMovie, (req, res) => {
  let movie = res.locals.movie;
  logger.log(`getting movie genre. ${movie.genre}`,'debug');
  res.send(`The movie Genre is ${movie.genre}.`);
});

//do not define next if you are not going to use it
//unless it is an error handling function
router.get('/movie/:id', lookupMovie, (req, res) => {
  let movie = res.locals.movie;
  logger.log(`getting movie details by Id: ${movie.id}`,'debug');
  res.send(`<h3> Movie Title: ${movie.title} Genre:${movie.genre}</h3>`);
});

router.get('/delete/:id', lookupMovie, (req, res) => {
  let movie = res.locals.movie;
  logger.log(`deleting movie: ${movie.title}`,'debug');
  movieService.delete(movie.id);
  res.redirect('back');
});


// this functions finds the movie id for any route to /movies
//That sends a request parameter of :id

function lookupMovie(req, res, next) {

  let movieId = req.params['id'];
  //checks to see if value is a number

  if(parseInt(movieId))
  {
    let matches = movieService.filter(m => m.id == movieId);
    if (!matches.length) {
    next(`No matching movie for id ${movieId} was found` );
    } else {
      res.locals.movie = matches[0];
      next();
    }
  }
  else{
      next(`Movie for id ${movieId} is not a number `);

  }
}
//Error handling
router.use(function (err, req, res, next) {
/*   res.send(`<h1 class='well'>Error: Could not display movie information.</h1>

    ${err}
    `); */
  logger.log(`While getting movie details This happened, ${err} a`,'error');
  next(err);
})


export default router;
