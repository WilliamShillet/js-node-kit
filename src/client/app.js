/* eslint-disable no-console */
/** Main Client Module Loader for basic SPA*/

//import in styles
import './public/styles/styles.less';
//import in images
import './public/images/film.png';
import './public/images/robot-waving.gif';
import movieApp from './app/movieapp';


  //load the client side apps you want to use
  let titleEl = document.getElementById("headername");
  let moduleEl = document.getElementById("movieApp");
  movieApp.show(moduleEl,titleEl);
