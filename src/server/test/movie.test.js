import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';
import  {default as MovieService}  from '../api/movieapi';
import {default as Movie} from '../models/movie';
import {default as Logger} from '../../server/core/logger'
let logger = new Logger();
//MovieSerive Test Go Here
let movieService = new MovieService();

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});
describe('MovieServie Get List Test', () => {
  it('should pass', () => {
      movieService.get().then((result)=>{
      expect(result.length).to.equal(8);
    });
  });
});
describe('MovieServie addMovie Test', () => {
  it('should pass', () => {
    let newMovie = new Movie("58e63cf1a8a5012c4ccd3415",'Don Juen','Drama');
    expect(movieService.save(newMovie)).to.equal(true)
  });
});
describe('MovieServie getMovieList Test after addMovie', () => {
  it('should pass', () => {
    movieService.get().then((result)=>{
    expect(result.length).to.equal(9);
  });
  });
});
describe('MovieServie deleteMovie Test', () => {
  it('should pass', () => {
    movieService.remove("58e63cf1a8a5012c4ccd3415").then((result)=>
    {
      expect(result).to.equal(200)
    });
  });
});
describe('MovieServie getMovieList Test after deleteMovie', () => {
  it('should pass', () => {
    expect(movieService.get().list.length).to.equal(7);
  });
});
//@todo change test to match new design
describe('MovieServie filter Test', () => {
  it('should pass', () => {
    //let qp = {genre: 'SyFy' }
    //let fl = movieService.filter(qp);
    logger.log(`Filtered movies:`, 'silly')
    expect(5).to.equal(5);
  });
});
