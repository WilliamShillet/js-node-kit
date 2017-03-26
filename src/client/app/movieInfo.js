/* eslint-disable no-unused-vars */
/** Service for Movie App
/* Here is where you build the MovieApp service */
//import in template
import view from './views/movies.html';

export default (app)=>
{
  app.directive('movieInfo',(movieList)=>
{
  return {
     template: view ,
     restrict:'E',
     controller:($scope)=>{
       $scope.movies = movieList;
     }
  }
} );
}
