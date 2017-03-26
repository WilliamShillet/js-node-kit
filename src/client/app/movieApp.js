/* eslint-disable no-unused-vars */
/** Namespace for Movie App
/* Here is where you build the MovieApp module */
export default (app)=>
{
  app.directive('movieInfo',(movieList)=>
{
  return {
     template: `<h1 ng-repeat='movie in movies'> {{movie.title}}!</h1>`,
     restrict:'E',
     controller:($scope)=>{
       $scope.movies = movieList;
     }
  }
} );
}
