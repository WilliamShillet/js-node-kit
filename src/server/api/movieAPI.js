/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
//import our Model Here
import {default as Movie, MovieCollection as movieCollection} from '../models/movie';
import {default as log} from '../../server/core/logger';

//create logger;
let logger = new log();

export default class MovieService
{
  constructor(){

logger.log('Created Movies in the Movie Api', 'debug')

let getMovieCollection = () =>
  {
      return new Promise((resolve, reject) => {

        let movies =  new movieCollection();
         if(movies.length === 0)
           {
             movies.add(new Movie(1017109,'Juno','Drama'));
             movies.add(new Movie(1017105,'Star Wars','SyFy'));
             movies.add(new Movie(1017108,'Big','SyFY'));
             movies.add(new Movie(1017104,'The Lego Movie','Comedy'));
             movies.add(new Movie(1017119,'The Green Mile','SyFy'));
             movies.add(new Movie(1017106,'I-Robot','SyFY'));
             movies.add(new Movie(4444441,'Logan','SyFy'));
             movies.add(new Movie(1017458,'Ghost Busters','SyFY'));
          }
          resolve(movies.list);
    });
  }
//@todo add other crud functions here
let save = (movie) =>
{
  let id = movie.id;
  return new Promise((resolve, reject) => {
  let result = false;
  let movies =  new movieCollection();
  if(id !== undefined)
  {
    result = true;
    movies.edit(movie)
    resolve(movie);
  }
  else {

    result = true;
    movies.add(new Movie(Math.random(), movie.title, movie.genre));
    resolve(movie);
  }

});

}

let getMoviebyId = (sid) =>
  {
      let id = parseInt(sid);
      logger.log(`the id is ${sid}has space`, 'debug')
      let movies =  new movieCollection();
      let index = movies.list.findIndex((movie)=>{return movie.id === id; });
      return new Promise((resolve, reject) => {
        let result = movies.list[index];
        logger.log(`the movie is ${result.title}`, 'debug')
        if(result === null)
        {
          logger.log(`No record Found`, 'debug')
          reject(`Result was null`);
        }
        else {

          resolve(result);

        }

        })

  }
  let removeMovie = (id) =>
    {
        return new Promise((resolve, reject) => {
          logger.log(`the id is ${id}`, 'debug')
          let result = 100;
         try {
                let movies =  new movieCollection();
                 movies.delete(id);
                 result = 200;
                resolve(result);
              }
              catch (e) {
                  result= 500;
                  logger.log(`the id is ${id} is not in the list`, 'error')
                  reject(e);
              }

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
