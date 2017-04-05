/* eslint-disable no-unused-vars */
/** Namespace for Movie App
/* Here is where you build the MovieApp module */
//import MovieController from './controllers/moviecontroller'
import {default as MovieService} from './services/service';
let mainView = {};
export default class MovieApp{

static show(baseEl, titleEL)
{

  titleEL.innerHTML = 'Movies' ;
  //let controller = new MovieController();
  //load template
  MovieService.getMovieList().then( (result)=>{
      mainView = this.buildMovieHomeView(baseEl,result);
      mainView.showView();
  });


}
static buildMovieHomeView(baseElement, movieModel){
let movieElement = document.createElement( "div" );
let render = ()=>{
  // Instead of loadmovies We should use templating library
  //  which generates the HTML for our movie entry
  // I just used a function to be simple for this example
  movieElement.innerHTML = movieModel //this.loadmovies(movieModel.list,movieController)
  baseElement.appendChild(movieElement);
}

let show = function () {
  movieElement.style.display = "";
  render();
};

let hide = function () {
  movieElement.style.display = "none";
};

return {
       showView: show,
       hideView: hide
      }

}


}
