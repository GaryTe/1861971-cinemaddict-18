import {movies} from '../data';

export default class MoviesModel {
  #movies = movies;

  get movies () {return this.#movies;}
}
