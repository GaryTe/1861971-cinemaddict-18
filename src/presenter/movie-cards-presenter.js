import MovieCardView from '../view/movie-card-view.js';
import PopupView from '../view/popup-view.js';
import {RenderPosition, render, remove, replace} from '../framework/render.js';

export default class MovieCardsPresenter {
  #movieCard = null;
  #container = null;
  #popup = null;
  #element = null;
  #parentElements = null;
  #taskChange = null;
  #movie = null;


  constructor (container, element, parentElements, taskChange) {
    this.#container = container;
    this.#element = element;
    this.#parentElements = parentElements;
    this.#taskChange = taskChange;
  }


  init (movie) {
    this.#movie = movie;

    const prevMovieCard = this.#movieCard;
    const prevPopup = this.#popup;

    this.#movieCard = new MovieCardView (movie);

    this.#movieCard.setClickHandler (this.#renderPopup);
    this.#movieCard.setAddToWatchlis (this.#addToWatchlis);
    this.#movieCard.setAlreadyWatched (this.#alreadyWatched);
    this.#movieCard.setAddToFavorites (this.#addToFavorites);

    if (prevMovieCard === null) {
      render(this.#movieCard, this.#container);
      return;
    }

    if (this.#container.contains(prevMovieCard.element)) {
      replace (this.#movieCard, prevMovieCard);
      this.#popup = new PopupView (this.#movie);
      this.#addHandlersToPopup ();
      replace (this.#popup, prevPopup);
    }
  }


  #renderPopup = (movie) => {
    document.addEventListener('keydown',this.#closePopupKey);
    this.#checkOpenPopups ();
    this.#popup = new PopupView (movie);
    this.#addHandlersToPopup ();
    render(this.#popup, this.#element, RenderPosition.AFTEREND);
    this.#parentElements.classList.add ('hide-overflow');
  };


  #addHandlersToPopup = () => {
    this.#popup.setClickHandler (this.#closPopup);
    this.#popup.setAddToWatchlis (this.#addToWatchlis);
    this.#popup.setAlreadyWatched (this.#alreadyWatched);
    this.#popup.setAddToFavorites (this.#addToFavorites);
  };


  #checkOpenPopups () {
    const popups = document.querySelectorAll('.film-details');
    if (popups.length > 0){
      this.#parentElements.removeChild(popups[0]);
    }
  }


  #closPopup = () => {
    document.removeEventListener('keydown', this.#closePopupKey);
    const childElement = document.querySelector ('.film-details');
    this.#parentElements.removeChild (childElement);
    this.#parentElements.classList.remove ('hide-overflow');
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


  #addToWatchlis = () => {
    this.#taskChange ({...this.#movie, userDetails: {...this.#movie.userDetails,watchlist : !this.#movie.userDetails.watchlist}});
  };


  #alreadyWatched = () => {
    this.#taskChange ({...this.#movie, userDetails: {...this.#movie.userDetails,alreadyWatched : !this.#movie.userDetails.alreadyWatched}});
  };


  #addToFavorites = () => {
    this.#taskChange ({...this.#movie, userDetails: {...this.#movie.userDetails,favorite : !this.#movie.userDetails.favorite}});
  };
}
