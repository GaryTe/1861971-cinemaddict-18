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
}
