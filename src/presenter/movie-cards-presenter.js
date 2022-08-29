import MovieCardView from '../view/movie-card-view.js';
import ButtonView from '../view/button-view.js';
import PopupView from '../view/popup-view.js';
import MessageView from '../view/message-view.js';
import {RenderPosition, render, remove} from '../framework/render.js';

const COUNTER = 5;

export default class MovieCardsPresenter {
  #parentElements = null;
  #container = null;
  #element = null;
  #moviesModel = null;
  #containerView = null;
  #sortingView = null;
  #movies = [];
  #messageView = new MessageView;
  #buttonView = new ButtonView;
  #counterNumber = COUNTER;
  #movieCard = null;
  #collectionMovieCard = new Set ();
  #popup = null;


  constructor (container, element, moviesModel, parentElements, containerView, sortingView,) {
    this.#parentElements = parentElements;
    this.#container = container;
    this.#element = element;
    this.#moviesModel = moviesModel;
    this.#movies = this.#moviesModel.movies;
    this.#containerView = containerView;
    this.#sortingView = sortingView;
  }

  init = () => {
    this.#validationData ();
  };


  #validationData () {
    if (this.#movies.every ((data) => data.isArchive)) {
      remove (this.#sortingView);
      render(this.#messageView, this.#containerView.element, RenderPosition.AFTERBEGIN);
    } else {
      remove (this.#messageView);
      this.#transferData ();
    }
  }


  setChangeData (temporaryDatas) {
    this.#movies = temporaryDatas;
    this.#counterNumber = COUNTER;
    this.#collectionMovieCard.forEach ((movieCard) => remove (movieCard));
    this.#collectionMovieCard.clear ();
    remove (this.#movieCard);
    this.#validationData ();
  }


  #renderMoreCards = () => {
    this.#movies
      .slice (this.#counterNumber, this.#counterNumber + COUNTER)
      .forEach ((value) => this.#renderMovieCardAndPopup (value));

    this.#counterNumber += COUNTER;

    this.#removeButton ();
  };


  #transferData () {
    for (let i = 0; i < Math.min (COUNTER, this.#movies.length); i++) {
      this.#renderMovieCardAndPopup (this.#movies[i]);
    }

    if (this.#movies.length > COUNTER) {
      render(this.#buttonView, this.#container, RenderPosition.AFTEREND);
      this.#buttonView.setClickHandler (this.#renderMoreCards);
    }
  }


  #removeButton () {
    if (this.#counterNumber >= this.#movies.length) {
      remove (this.#buttonView);
    }
  }


  #closePopupKey = (evt) => {
    if(evt.key === 'Esc' || evt.key === 'Escape') {
      this.#closPopup();
      document.removeEventListener('keydown', this.#closePopupKey);
    }
  };


  #renderPopup = (data) => {
    document.addEventListener('keydown',this.#closePopupKey);
    this.#checkOpenPopups ();
    this.#popup = new PopupView (data);
    this.#popup.setClickHandler (this.#closPopup);
    render(this.#popup, this.#element, RenderPosition.AFTEREND);
    this.#parentElements.classList.add ('hide-overflow');
  };


  #renderMovieCardAndPopup (data) {
    this.#movieCard = new MovieCardView (data);
    this.#movieCard.setClickHandler (this.#renderPopup,data);
    render(this.#movieCard, this.#container);
    this.#collectionMovieCard.add (this.#movieCard);
  }


  #closPopup = () => {
    document.removeEventListener('keydown', this.#closePopupKey);
    const childElement = document.querySelector ('.film-details');
    this.#parentElements.removeChild (childElement);
    this.#parentElements.classList.remove ('hide-overflow');
  };


  #checkOpenPopups () {
    if (this.#popup !== null) {
      remove (this.#popup);
    }
  }

}
