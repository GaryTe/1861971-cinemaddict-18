import {movies} from '../data';
import Observable from '../framework/observable.js';

export default class MoviesModel extends Observable{
  #movies = movies;

  get movies () {return this.#movies;}


  updateTask = (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie card');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      update,
      ...this.#movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  };


  addTask = (updateType, update) => {
    this.#movies = [
      update,
      ...this.#movies,
    ];

    this._notify(updateType, update);
  };


  deleteTask = (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting movie card');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      ...this.#movies.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
