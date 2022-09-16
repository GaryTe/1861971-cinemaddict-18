import MovieCardView from '../view/movie-card-view.js';
import PopupView from '../view/popup-view.js';
import {RenderPosition, render, remove, replace} from '../framework/render.js';
import {UserAction, UpdateType, FilterType} from '../const.js';

export default class MovieCardsPresenter {
  #movieCard = null;
  #container = null;
  #popup = null;
  #footerElement = null;
  #bodyElement = null;
  #movieChange = null;
  #movie = null;
  #film = null;
  #key = null;

  #scrollCoordinate = 0;
  #userAction = UserAction.UPDATE_TASK;
  #updateType = UpdateType.MAJOR;

  constructor (container, footerElement, bodyElement, movieChange, key) {
    this.#container = container;
    this.#footerElement = footerElement;
    this.#bodyElement = bodyElement;
    this.#movieChange = movieChange;
    this.#key = key;
    this.#userAction = key.userAction;
    this.#updateType = key.updateType;

  }


  init (movie) {
    this.#movie = movie;

    const prevMovieCard = this.#movieCard;
    const prevPopup = this.#popup;

    this.#movieCard = new MovieCardView (movie);


    switch (this.#key.key) {
      case FilterType.WATCHLIST:
        this.#movieCard.setAddToWatchlis (this.#addToWatchlis);
        break;
      case FilterType.FAVORITE:
        this.#movieCard.setAddToFavorites (this.#addToFavorites);
        break;
      case FilterType.ALREADY_WATCHED:
        this.#movieCard.setAlreadyWatched (this.#alreadyWatched);
        break;
      default:
        this.#movieCard.setAddToWatchlis (this.#addToWatchlis);
        this.#movieCard.setAddToFavorites (this.#addToFavorites);
        this.#movieCard.setAlreadyWatched (this.#alreadyWatched);
        break;
    }
    this.#movieCard.setClickHandler (this.#renderPopup);


    if (prevMovieCard === null) {
      render(this.#movieCard, this.#container);
      return;
    }

    if (this.#container.contains(prevMovieCard.element)) {
      replace (this.#movieCard, prevMovieCard);
      this.#popup = new PopupView (this.#movie);
      this.#addHandlersToPopup ();
      replace (this.#popup, prevPopup);
      this.#putPopupByCoordinates ();
    }
  }


  #renderPopup = (movie) => {
    document.addEventListener('keydown',this.#closePopupKey);
    this.#checkOpenPopups ();
    this.#popup = new PopupView (movie);
    this.#addHandlersToPopup ();
    render(this.#popup, this.#footerElement, RenderPosition.AFTEREND);
    this.#putPopupByCoordinates ();
    this.#bodyElement.classList.add ('hide-overflow');
  };


  #addHandlersToPopup = () => {
    this.#popup.setClickHandler (this.#closPopup);
    this.#popup.setAddToWatchlis (this.#addToWatchlis);
    this.#popup.setAddToFavorites (this.#addToFavorites);
    this.#popup.setAlreadyWatched (this.#alreadyWatched);
    this.#popup.setDeleteComment (this.#deleteComment);
    this.#popup.setReturnNewMovie (this.#getNewMovie);
  };


  #putPopupByCoordinates () {
    this.#popup.element.scrollBy (0, this.#scrollCoordinate);
  }

  #checkOpenPopups () {
    const popups = document.querySelectorAll('.film-details');
    if (popups.length > 0){
      this.#bodyElement.removeChild(popups[0]);
    }
  }


  #closPopup = () => {
    document.removeEventListener('keydown', this.#closePopupKey);
    const popupElement = document.querySelector ('.film-details');
    this.#bodyElement.removeChild (popupElement);
    this.#bodyElement.classList.remove ('hide-overflow');
    this.#scrollCoordinate = 0;
  };


  #closePopupKey = (evt) => {
    if(evt.key === 'Esc' || evt.key === 'Escape') {
      this.#closPopup();
      document.removeEventListener('keydown', this.#closePopupKey);
    }
  };


  destroy () {
    remove(this.#movieCard);
  }


  #addToWatchlis = (coordinate) => {
    this.#scrollCoordinate = coordinate;
    this.#movieChange (
      this.#userAction,
      this.#updateType,
      {...this.#movie, userDetails: {...this.#movie.userDetails,watchlist : !this.#movie.userDetails.watchlist}}
    );
  };


  #alreadyWatched = (coordinate) => {
    this.#scrollCoordinate = coordinate;
    this.#movieChange (
      this.#userAction,
      this.#updateType,
      {...this.#movie, userDetails: {...this.#movie.userDetails,alreadyWatched : !this.#movie.userDetails.alreadyWatched}}
    );
  };


  #addToFavorites = (coordinate) => {
    this.#scrollCoordinate = coordinate;
    this.#movieChange (
      this.#userAction,
      this.#updateType,
      {...this.#movie, userDetails: {...this.#movie.userDetails,favorite : !this.#movie.userDetails.favorite}}
    );
  };


  #deleteComment = (id,coordinate) => {
    this.#scrollCoordinate = coordinate;
    this.#movieChange (
      UserAction.UPDATE_TASK,
      UpdateType.PATCH,
      {...this.#movie, comments: [...this.#movie.comments.filter ((comment) => comment !== this.#movie.comments[id])]}
    );
  };


  #getNewMovie = (movie) => {
    this.#film = movie;
  };
}
