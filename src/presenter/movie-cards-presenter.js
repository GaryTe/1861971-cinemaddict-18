import MovieCardView from '../view/movie-card-view.js';
import PopupView from '../view/popup-view.js';
import {RenderPosition, render, remove, replace} from '../framework/render.js';

export default class MovieCardsPresenter {
  #movieCard = null;
  #container = null;
  #popup = null;
  #footerElement = null;
  #bodyElement = null;
  #movieChange = null;
  #movie = null;
  #scrollCoordinate = 0;


  constructor (container, footerElement, bodyElement, movieChange) {
    this.#container = container;
    this.#footerElement = footerElement;
    this.#bodyElement = bodyElement;
    this.#movieChange = movieChange;
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
    this.#popup.setAlreadyWatched (this.#alreadyWatched);
    this.#popup.setAddToFavorites (this.#addToFavorites);
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
    this.#movieChange ({...this.#movie, userDetails: {...this.#movie.userDetails,watchlist : !this.#movie.userDetails.watchlist}});
  };


  #alreadyWatched = (coordinate) => {
    this.#scrollCoordinate = coordinate;
    this.#movieChange ({...this.#movie, userDetails: {...this.#movie.userDetails,alreadyWatched : !this.#movie.userDetails.alreadyWatched}});
  };


  #addToFavorites = (coordinate) => {
    this.#scrollCoordinate = coordinate;
    this.#movieChange ({...this.#movie, userDetails: {...this.#movie.userDetails,favorite : !this.#movie.userDetails.favorite}});
  };
}
