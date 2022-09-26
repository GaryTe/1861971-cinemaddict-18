import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable{
  #commentsService = null;
  #comments = [];

  constructor (commentsService) {
    super ();
    this.#commentsService = commentsService;
  }

  getComments = async (film) => {
    try {
      this.#comments = await this.#commentsService.getComments (film);
    } catch(err) {
      this.#comments = [];
    }
    this._notify (film, this.#comments);
  };


  deleteComment = async (updateType, update, commentary) => {
    const index = this.#comments.findIndex((comment) => comment.id === commentary.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting movie card');
    }

    try {
      await this.#commentsService.deleteComment (commentary);

      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];

      this._notify(updateType,{update, commentary: this.#comments});

    } catch(err) {
      throw new Error('Can\'t delete task');
    }
  };


  addComment = async (updateType, update) => {
    try {
      const response = await this.#commentsService.addComment(update);
      const newComment = this.#adaptToClient(response);

      this._notify(updateType, newComment);

    }catch(err) {
      throw new Error('Can\'t add task');
    }
  };


  #adaptToClient = (film) => {

    const adaptedMovie = {
      update: {...film,
        ...film.movie,
        filmInfo:{
          ...film.movie ['film_info'],
          ageRating: film.movie ['film_info']['age_rating'],
          alternativeTitle: film.movie ['film_info'] ['alternative_title'],
          release:{
            ...film.movie ['film_info'] ['release'],
            releaseCountry:  film.movie ['film_info'] ['release'] ['release_country'],
          },
          totalRating: film.movie ['film_info'] ['total_rating'],
        },

        userDetails:{
          ...film.movie ['user_details'],
          alreadyWatched: film.movie ['user_details'] ['already_watched'],
          watchingDate: film.movie ['user_details'] ['watching_date']
        }
      },

      commentary: film.comments

    };

    delete adaptedMovie.update.filmInfo ['age_rating'];
    delete adaptedMovie.update.filmInfo ['alternative_title'];
    delete adaptedMovie.update.filmInfo.release ['release_country'];
    delete adaptedMovie.update.filmInfo ['total_rating'];
    delete adaptedMovie.update.userDetails ['already_watched'];
    delete adaptedMovie.update.userDetails ['watching_date'];
    delete adaptedMovie.update ['user_details'];
    delete adaptedMovie.update ['film_info'];

    return adaptedMovie;
  };
}
