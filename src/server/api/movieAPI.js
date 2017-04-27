import {default as Database} from  "../../server/data/db";
import {default as log} from '../../server/core/logger';
import  {default as Movie}  from '../models/movie';
import mongodb from 'mongodb';
//create logger;
let logger = new log();

export default class MovieService
{
  constructor(){

logger.log('Created Movies in the Movie Api', 'debug')

let getMovieCollection = () =>
  {
      return new Promise((resolve, reject) => {

    Database.db.collection('movies').find().toArray().then((result)=>{
        resolve(result);
    }).
    catch((error) => {
         logger.log(`Mongo has a problem: ${error}`, 'debug')
           reject(error);
    })
});
  }
//@todo add other crud functions here
let save = (movie) =>
{
  return new Promise((resolve, reject) => {
    if(movie._id)movie._id = new mongodb.ObjectID(movie._id.trim()); // convert _id to object
    logger.log(`the id is ${movie._id}`, 'debug')
    Database.db.collection('movies').save(movie).then((result)=> {
    logger.log(`the movie is ${result}`, 'debug')
    if(result === null)
    {
      logger.log(`Errror on Save adding Movie to the database`, 'debug')
      reject(`Result was null`);
    }
    else {
      resolve(result);

    }


    }).
catch((error) => {
     logger.log(`Mongo has a problem: ${error}`, 'debug')
       reject(error);
})
});

}

let getMoviebyId = (id) =>
  {
      return new Promise((resolve, reject) => {
        logger.log(`the id is ${id}`, 'debug')
        let movieId = new mongodb.ObjectID(id);
        Database.db.collection('movies').findOne(movieId).then((result)=> {
        logger.log(`the movie is ${result}`, 'debug')
        if(result === null)
        {
          logger.log(`No record Found`, 'debug')
          reject(`Result was null`);
        }
        else {
          resolve(result);

        }


        }).
    catch((error) => {
         logger.log(`Mongo has a problem: ${error}`, 'debug')
           reject(error);
    })
});
  }
  let removeMovie = (id) =>
    {
        return new Promise((resolve, reject) => {
          logger.log(`the id is ${id}`, 'debug')
          let movieId = new mongodb.ObjectID(id);
          Database.db.collection('movies').remove({_id:movieId}).then((result)=> {
            resolve(200);
          }).
      catch((error) => {
           logger.log(`Mongo has a problem: ${error}`, 'debug')
             reject(error);
      })
  });
    }

let queryList = (...queryobj) =>
{

return null;
}

let sort = (col = 'title', dir='1') =>
{

return null;
}

let service = {
    get: getMovieCollection,
    getbyId: getMoviebyId,
    save: save,
    remove: removeMovie,
    filter: queryList,
    sort: sort

};
//return service
return service;
}
}

export class MovieController
{

static  renderView(movieService)
{

  return(req, res, next)=>
    {
      logger.log('getting movie list.','debug');
      logger.log(`movie service is. ${this}`,'debug');
      let command = req.query['command'];
      switch (command) {
        case 'add':4
         {
           logger.log('adding a movie.','debug');
           res.render('pages/movies.ejs',{movies:false, adding: new Movie(), editing:false,details:false});
           break;
         }
        case 'edit':
        {
          logger.log('edit a movie.','debug');
        movieService.getbyId(req.query['id']).then((result)=>
             {
              logger.log('sending edit movie to browser.','debug');
              res.render('pages/movies.ejs',{movies:false, adding:result,editing:true,details:false});
             });
          break;
          }
        case 'details':
        {
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
        }
        case 'delete':
          break;
        default:
        {
          logger.log('sending movie list.','debug');
          logger.log(`sending movie list. ${this}`,'debug');

           movieService.get().then((result)=> {
           logger.log(result.length,'info');
           res.render('pages/movies.ejs',{movies: result, adding: false, editing:false, details:false});
                                        });
        }
      }


    }

}
  static postView(movieService)
  {
    return (req, res,next)=>{
      let movie = req.body;
      logger.log(`Saving movie: ${JSON.stringify(movie)}`, 'debug')
       movieService.save(movie).then((result)=>
          {
            logger.log(`New movie added: ${result.title}`, 'debug')
            res.redirect('/movies');

          }).catch((error) => {
            next(`${error}` );
         })

    }
  }
  static deleteView(movieService)
  {
    return (req, res, next) =>{
    let movieId = req.params['id'];
    logger.log(`removing movie by Id: ${movieId}`,'debug');
    movieService.remove(movieId).then((result)=>
        {
      logger.log(` movie was removed:`, 'debug')
          if(result === 200) res.redirect('/movies');


        }).catch((error) => {
          next(`No matching movie to delete ${error}` );
       })

  }
}
}
