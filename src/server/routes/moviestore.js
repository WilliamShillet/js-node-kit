 /* eslint-disable no-case-declarations*/
import express from 'express';
import  {default as Movie}  from '../models/movie';
import  {default as MovieService}  from '../api/movieapi';
import {default as Logger} from '../../server/core/logger';
let router = express.Router();
let movieService = new MovieService();
let logger = new Logger();


router.get('/', function(req, res,next) {
    logger.log('getting movie list.','debug');
    let command = req.query['command'];
    switch (command) {
      case 'add':4
       logger.log('adding a movie.','debug');
        let movie = new Movie();
        res.render('pages/movies.ejs',{movies:false, adding: movie, editing:false,details:false});
        break;
      case 'edit':
      logger.log('edit a movie.','debug');
      movieService.getbyId(req.query['id']).then((result)=>
     {
        logger.log('sending edit movie to browser.','debug');
        res.render('pages/movies.ejs',{movies:false, adding:result,editing:true,details:false});
     });
        break;
      case 'details':
      //details
      let movieId = req.params['id'];
      logger.log(`getting movie details by Id: ${movieId}`,'debug');
      movieService.getbyId(movieId).then((match)=>
          {
        logger.log(`Got movie: ${match}`, 'debug')

            res.render('pages/movies.ejs',{movies:false, adding:false, editing:false, details:match});

          }).catch((error) => {
            next(`No matching movie was found for requested Id ${error} ` );
         })
        break;
      case 'delete':
        break;
      default:
      logger.log('sending movie list.','debug');
      movieService.get().then((result)=>
    {
       logger.log(result.length,'info');
       res.render('pages/movies.ejs',{movies: result, adding: false, editing:false, details:false});

    });
    }
});
router.post('/add', (req, res,next) => {
  let movie = req.body;
  logger.log(`Saving movie: ${JSON.stringify(movie)}`, 'debug')
   movieService.save(movie).then((result)=>
      {
        logger.log(`New movie added: ${result.title}`, 'debug')
        res.redirect('/movies');

      }).catch((error) => {
        next(`${error}` );
     })

});

router.get('/delete/:id', (req, res, next) => {
  let movieId = req.params['id'];
  logger.log(`removing movie by Id: ${movieId}`,'debug');
  movieService.remove(movieId).then((result)=>
      {
    logger.log(` movie was removed:`, 'debug')
        if(result === 200) res.redirect('/movies');


      }).catch((error) => {
        next(`No matching movie to delete ${error}` );
     })

});

export default router;
