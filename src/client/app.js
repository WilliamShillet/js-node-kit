/* eslint-disable no-console */
/** Main Client Module Loader for basic SPA
/* create the main angular app module and config*/
import './public/styles/styles.less';
import angular from 'angular'

let app = angular.module('app',[]);
//load movie app
import _movieApp from './app/movieApp';
_movieApp(app);
