import MovieCardView from '../view/movie-card-view.js';
import {render, remove, replace} from '../framework/render.js';
import {FilterType} from '../const.js';

export default class MovieCardsPresenter {
  #movieCard = null;
  #container = null;
  #movieChange = null;
  #movie = null;
  #renderPopup = null;
  #userAction = null;
  #updateType = null;

  constructor (container, movieChange, userAction, updateType, renderPopup) {
    this.#container = container;
    this.#movieChange = movieChange;
    this.#userAction = userAction;
    this.#updateType = updateType;
    this.#renderPopup = renderPopup;

  }


  init (movie) {
    this.#movie = movie;

    const prevMovieCard = this.#movieCard;

    this.#movieCard = new MovieCardView (movie);

    this.#movieCard.setAddToWatchlis (this.#addToWatchlis);
    this.#movieCard.setAddToFavorites (this.#addToFavorites);
    this.#movieCard.setAlreadyWatched (this.#alreadyWatched);
    this.#movieCard.setClickHandler (this.#renderPopup);


    if (prevMovieCard === null) {
      render(this.#movieCard, this.#container);
      return;
    }

    if (this.#container.contains(prevMovieCard.element)) {
      replace (this.#movieCard, prevMovieCard);
    }
  }


  destroy () {
    remove(this.#movieCard);
  }


  #addToWatchlis = () => {
    this.#movieChange (
      this.#userAction,
      this.#updateType,
      {...this.#movie, userDetails: {...this.#movie.userDetails,watchlist : !this.#movie.userDetails.watchlist}},
      FilterType.WATCHLIST
    );
  };


  #alreadyWatched = () => {
    this.#movieChange (
      this.#userAction,
      this.#updateType,
      {...this.#movie, userDetails: {...this.#movie.userDetails,alreadyWatched : !this.#movie.userDetails.alreadyWatched}},
      FilterType.ALREADY_WATCHED
    );
  };


  #addToFavorites = () => {
    this.#movieChange (
      this.#userAction,
      this.#updateType,
      {...this.#movie, userDetails: {...this.#movie.userDetails,favorite : !this.#movie.userDetails.favorite}},
      FilterType.FAVORITE
    );
  };

}
