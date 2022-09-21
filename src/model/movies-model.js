import {movies} from '../data';
import Observable from '../framework/observable.js';

export default class MoviesModel extends Observable{
  #movies = movies;
  #moviesService = null;


  constructor (moviesService) {
    super ();
    this.#moviesService = moviesService;

    this.#moviesService.tasks.then((movieCards) => {
      console.log (movieCards);
      console.log(movieCards.map (this.#adaptToClient));
    });
  }


  #adaptToClient = (movie) => {

    const adaptedTask = {...movie,
      filmInfo: movie ['film_info'],
      ageRating: movie ['film_info']['age_rating'],
      alternativeTitle: movie ['film_info'] ['alternative_title'],
      releaseCountry: movie ['film_info'] ['release'] ['release_country'],
      totalRating: movie ['film_info'] ['total_rating'],
      userDetails: movie ['user_details'],
      alreadyWatched: movie ['user_details'] ['already_watched'],
      watchingDate: movie ['user_details'] ['watching_date']
    };


    delete adaptedTask ['film_info'] ['age_rating'];
    delete adaptedTask ['film_info'] ['alternative_title'];
    delete adaptedTask ['film_info'] ['release'] ['release_country'];
    delete adaptedTask ['film_info'] ['total_rating'];
    delete adaptedTask ['user_details'] ['already_watched'];
    delete adaptedTask ['user_details'] ['watching_date'];
    delete adaptedTask ['user_details'];
    delete adaptedTask ['film_info'];

    return adaptedTask;
  };


  get movies () {return this.#movies;}

  set movies (update) {
    this.#movies = [
      update,
      ...this.#movies,
    ];
  }


  updatedMovie = (updateType, update) => {
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


  addMovie = (updateType, update) => {
    this.#movies = [
      update,
      ...this.#movies,
    ];

    this._notify(updateType, update);
  };


  deleteMovie = (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting movie card');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      ...this.#movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}
