import MovieCardView from '../view/movie-card-view.js';
import {render, remove, replace} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';

export default class MovieCardsPresenter {
  #movieCard = null;
  #containerElement = null;
  #movieChange = null;
  #movie = null;
  #renderPopup = null;


  constructor (containerElement, movieChange, renderPopup) {
    this.#containerElement = containerElement;
    this.#movieChange = movieChange;
    this.#renderPopup = renderPopup;

  }


  init (movie) {
    this.#movie = movie;

    const prevMovieCard = this.#movieCard;

    this.#movieCard = new MovieCardView (movie);

    this.#movieCard.setAddToWatchlis (this.#addToWatchlis);
    this.#movieCard.setAddToFavorites (this.#addToFavorites);
    this.#movieCard.setAlreadyWatched (this.#addAlreadyWatched);
    this.#movieCard.setClickHandler (this.#renderPopup);


    if (prevMovieCard === null) {
      render(this.#movieCard, this.#containerElement);
      return;
    }

    if (this.#containerElement.contains(prevMovieCard.element)) {
      replace (this.#movieCard, prevMovieCard);
    }
  }


  destroy () {
    remove(this.#movieCard);
  }


  setAborting (uiBlocker) {
    this.#movieCard.shakeControls (uiBlocker.unblock);
  }


  #addToWatchlis = () => {
    this.#movieChange (
      UserAction.UPDATE_MOVIE,
      UpdateType.MAJOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails,watchlist : !this.#movie.userDetails.watchlist}},
    );
  };


  #addAlreadyWatched = () => {
    this.#movieChange (
      UserAction.UPDATE_MOVIE,
      UpdateType.MAJOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails,alreadyWatched : !this.#movie.userDetails.alreadyWatched}},
    );
  };


  #addToFavorites = () => {
    this.#movieChange (
      UserAction.UPDATE_MOVIE,
      UpdateType.MAJOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails,favorite : !this.#movie.userDetails.favorite}},
    );
  };

}
