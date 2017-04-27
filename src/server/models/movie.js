/**
* Movie.js this is our model for a movie
*/
import moment from 'moment';
import {default as observable, observe}  from '../core/observer.js';
import {default as log} from '../../server/core/logger';

//create logger;
let logger = new log();

//here we define the private property keys
let s_id = Symbol('id');
let s_title = Symbol('title');
let s_genre = Symbol('genre');
let s_thumbnail = Symbol();

export default class Movie
{
  //Getters for Properties
  get id(){return this[s_id]}
  get title(){return this[s_title]}
  get genre(){return this[s_genre]}
  get thumbnail(){return this[s_thumbnail]}
  //Setters for Properties
  constructor(id=0,title="a Movie",genre='Syfy',thumbnail=''){
    this[s_id] = id;
    this[s_title] = title;
    this[s_genre] = genre;
    this[s_thumbnail] = thumbnail;

  }


}


/** this var is so that we have a Singleton Collection class */
let instance = null;
/** MovieCollection Class */
export class MovieCollection {
   get length(){
     return this.movies.length;
   }
   get list(){
     return this.movies
   }
   get created(){
     return this.movies.timeStamp;

   }
    constructor(){
    if(!instance){
             instance = this;
             this.movies = [];
             // to test whether we have singleton or not
             this.timeStamp = moment().format('YYYY-MM-DD h:mm:ss a');
             //@todo: change this to a log statment;
             logger.log(`A movie collection was created at ${this.timeStamp}`);
       }


       return instance;

  }
  add (movie= new Movie())
  {
   this.movies[this.length] = movie;
   //@todo: change this to a log statment;
   logger.log(`movie: ${movie.title} was update at ${moment().format('YYYY-MM-DD h:mm:ss a')}`);
  }
  delete (id=-1)
  {

    let index = this.movies.findIndex((movie)=>{return movie.id === parseInt(id); });
    if(!index)
    {
      throw new Error('You must enter a vaild id')
     }
     else{
       //@todo: change this to a log statment;
       logger.log(`movie: ${this.movies[index].title} was deleted at ${moment().format('YYYY-MM-DD h:mm:ss a')}`);
       this.movies.splice(index, 1);
     }

  }
  edit (movie)
  {
    let i = this.movies.indexOf(movie.id);
    logger.log(`movie edit ran at ${moment().format('YYYY-MM-DD h:mm:ss a')}`);
    logger.log(`index of movie is ${i}')}`);
    this.movies[i] = movie;
  }
  //this allows you to watch all items in a collection and if something changes
  // We will call the callback function you can also only watch one item in the list
  //@todo finish this
  itemsObservable(callback,index=-1){
    if(index === -1)
    {
    for(let m of this.movies){
  //  let o = observable(m);
  //  observe(callback);
    }
    }
    else {
      //observable(this.movies[index]);
      //observe(callback);
    }
  }



}
