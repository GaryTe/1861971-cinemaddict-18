import { UpdateType } from '../const';
import Observable from '../framework/observable.js';

export default class MoviesModel extends Observable{
  #movies = [];
  #moviesService = null;


  constructor (moviesService) {
    super ();
    this.#moviesService = moviesService;
  }


  #adaptToClient = (movie) => {

    const adaptedMovie = {...movie,
      filmInfo:{
        ...movie ['film_info'],
        ageRating: movie ['film_info']['age_rating'],
        alternativeTitle: movie ['film_info'] ['alternative_title'],
        release:{
          ...movie ['film_info'] ['release'],
          releaseCountry:  movie ['film_info'] ['release'] ['release_country'],
        },
        totalRating: movie ['film_info'] ['total_rating'],
      },
      userDetails:{
        ...movie ['user_details'],
        alreadyWatched: movie ['user_details'] ['already_watched'],
        watchingDate: movie ['user_details'] ['watching_date']
      }
    };

    delete adaptedMovie.filmInfo ['age_rating'];
    delete adaptedMovie.filmInfo ['alternative_title'];
    delete adaptedMovie.filmInfo.release ['release_country'];
    delete adaptedMovie.filmInfo ['total_rating'];
    delete adaptedMovie.userDetails ['already_watched'];
    delete adaptedMovie.userDetails ['watching_date'];
    delete adaptedMovie ['user_details'];
    delete adaptedMovie ['film_info'];

    return adaptedMovie;
  };


  get movies () {return this.#movies;}


  init = async () => {
    try {
      const films = await this.#moviesService.movies;
      this.#movies = films.map(this.#adaptToClient);
    } catch(err) {
      this.#movies = [];
    }
    this._notify (UpdateType.INIT);
  };


  updateMovie = async (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie card');
    }

    try {
      const response = await this.#moviesService.updatedFilm (update);
      const updatedMovieCard = this.#adaptToClient(response);

      this.#movies = [
        ...this.#movies.slice(0, index),
        updatedMovieCard,
        ...this.#movies.slice(index + 1),
      ];
      this._notify(updateType, updatedMovieCard);
    }catch(err) {
      throw new Error('Can\'t update task');
    }
  };

}
