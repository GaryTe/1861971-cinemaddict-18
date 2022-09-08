import {movies} from '../data.js';
import { humanizeYear } from '../utils.js';

export default class SortModel {
  #movies = movies;
  #sortMovies = [];

  setSortByDefault (sortName) {
    if (sortName === 'Sort by default') {
      return this.#movies;
    }
    if (sortName === 'Sort by date') {
      this.#sortMovies = this.#sortByDate ();
      return this.#sortMovies.reverse ();
    }
    if (sortName === 'Sort by rating') {
      this.#sortMovies = this.#sortByRating ();
      return this.#sortMovies.reverse ();
    }
  }


  #sortByRating () {
    const sortMovies = this.#movies.slice ();
    sortMovies.sort ((a,b) => {
      if (a.filmInfo.totalRating < b.filmInfo.totalRating) {
        return -1;
      }
    });
    return sortMovies;
  }


  #sortByDate () {
    const sortMovies = this.#movies.slice ();
    sortMovies.sort ((a,b) => {
      if (humanizeYear (a.filmInfo.release.date) < humanizeYear (b.filmInfo.release.date)) {
        return -1;
      }
    });
    return sortMovies;
  }
}
