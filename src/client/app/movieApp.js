/* eslint-disable no-unused-vars */
/** Namespace for Movie App
/* Here is where you load the MovieApp module features */
import _movieInfo from './movieInfo';
import _movieService from './services/service';
export default (app)=>
{
  //load movie app
  _movieInfo(app);
  _movieService(app);
  //etc...other features go here
}
