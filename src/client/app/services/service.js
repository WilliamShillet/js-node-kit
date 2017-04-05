/* eslint-disable no-unused-vars */
/** add Movie App Client Services here
*   This class will be where the you put Client side services
*/
import {default as $http} from './httpservice';
export default class MovieService
{
  static getMovieList() {
     let url = {url: '/movies/list'};
     return $http(url);

  }
  static addMovie(movie) {
     let url = {url: '/movies/add'};
     return $http(url);
  }
  static deleteMovie(id) {
     let url = {url: '/movies/delete'};
     return $http(url);
  }
  static watchMovieList() {
     let url = {url: '/movies/list/watch'};
     return $http(url);
  }

}
