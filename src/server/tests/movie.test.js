import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';
import  {default as MovieService}  from '../../server/api/movieapi';
import {default as Movie} from '../../server/models/movie';
let movieService = new MovieService();
let count = 8;


describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});
describe('MovieServie get Movie List Test', () => {
  it('should pass', () => {
    movieService.get().then((result)=>{
    logger.log(JSON.stringify(result),'debug');
    count = result.length;
    expect(count).to.equal(count);
  });
});
});
describe('MovieServie add Movie Test', () => {
  it('should pass', () => {
    let newMovie = new Movie("58e63cf1a8a5012c4ccd3415",'Don Juen','Drama');
    movieService.save(newMovie).then((result)=>{
      expect(result.id).to.equal("58e63cf1a8a5012c4ccd3415")
      expect(result.title).to.equal("Don Juen")
      expect(result.genre).to.equal("Drama")
      });
});
});
describe('MovieServie get Movie List Test after addMovie', () => {
  it('should pass', () => {
      movieService.get().then((result)=>{
      expect(result.length).to.equal(count+1);
    });
    });
  });
  describe('MovieServie delete Movie Test', () => {
    it('should pass', () => {
      movieService.remove("58e63cf1a8a5012c4ccd3415").then((result)=>
      {
        expect(result).to.equal(200)
      });
    });
  });
  describe('after deleteMovie test', () => {
    it('should pass', () => {
      movieService.get().then((result)=>{
        expect(result.length).to.equal(count);
    });

    });
  });

  describe('movies template', () => {
  it('should have h1 that says Movies List:', (done) => {
    const index = fs.readFileSync('./src/server/views/partials/movie/list.ejs', "utf-8");
    jsdom.env(index, function(err, window) {
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHTML).to.equal("Movies List:");
      done();
      window.close();
    });
  })
})

//MovieSerive Test Go Here
