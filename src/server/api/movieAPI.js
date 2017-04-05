/**
*   This class will be where the you put Client side services
*/
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
//import our Model Here
import {default as Movie, MovieCollection as movieCollection} from '../models/movie';
import {default as log} from '../../server/core/logger'
//create logger;
let logger = new log();
export default class MovieService
{
  constructor(){
let movies =  new movieCollection();
if(movies.length === 0)
{
  movies.add(new Movie(1017109,'Juno','Drama'));
  movies.add(new Movie(1017105,'Star Wars','SyFy'));
  movies.add(new Movie(1017108,'Big','SyFy'));
  movies.add(new Movie(1017104,'The Lego Movie','Comedy'));
  movies.add(new Movie(1017119,'The Green Mile','SyFy'));
  movies.add(new Movie(1017106,'I-Robot','SyFy'));
  movies.add(new Movie(4444441,'Logan','SyFy'));
}
logger.log('Created Movies in the Movie Api', 'debug')
//@todo replace this with ejs template
let renderMovieList=()=>
{
  let movies = getMovieCollection().list;
  let moviesTemplate = '';
  if (movies) {
     for(let m of movies)
     {
       /**@todo add button to delete a movie <button>Delete Me</button>
       /* when the button is clicked it will call the Controller */
       let movieItem = `<li>   Movie Title: ${m.title} Genre:${m.genre} </li>
       `;
       moviesTemplate += movieItem
     }
  }
  return `<h1>Movies List:</h1>
  <ul>
   ${moviesTemplate}
  </ul>
  `

}
let getMovieCollection = () =>
  {

    return movies;
  }
let addMovie = (movie = new Movie())=>
{
 let result = false;
  movies.add(movie);
  result= true;
  return result;
}
let deleteMovie = (id = -1) =>
{
  let result = false;
  try {
       movies.delete(id);
      result = true;
  } catch (e) {
    throw e;//add Error Code
  }

return result;


}

let filterList = (filter = (movie)=>{return movie.genre === 'Drama'; }) =>
{
let movies =  new movieCollection();
return movies.filter(filter);
}

let service = {
    get: getMovieCollection,
    filter: filterList,
    add: addMovie,
    delete: deleteMovie,
    renderMovieList: renderMovieList
};
//return service
return service;
}
}

export class Controller
{
  static  renderHomeView(data)
  {
    logger.log(data.length)
    this.movieHomeView = require('fs').readFileSync('src/server/views/movie/movies.ejs', 'utf-8')
    return require('ejs').render(this.movieHomeView, {movies: data});

  }
  static renderAddMovieView(data)
  {
    logger.log(data.length)
    this.movieHomeView = require('fs').readFileSync('src/server/views/movie/addmovie.ejs', 'utf-8')
    return require('ejs').render(this.movieHomeView, {movie: new Movie()});

  }
}
