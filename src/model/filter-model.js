import {movies} from '../data';

export default class FilterModel {
  #movies = movies;
  sortMovies = [];


  setSortDataByKey (filterNames) {
    this.sortMovies = [];
    for (const movie of this.#movies) {
      const {userDetails} = movie;
      if (userDetails[filterNames] === true) {
        this.sortMovies.push (movie);
      }
    }
    return this.sortMovies;
  }
}
