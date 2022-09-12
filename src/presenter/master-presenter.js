import ButtonView from '../view/button-view.js';
import MessageView from '../view/message-view.js';
import MovieCardPresenter from './movie-cards-presenter.js';
import {RenderPosition, render, remove} from '../framework/render.js';
import {updateItem} from '../utils.js';

const COUNTER = 5;

export default class MasterPresenter {
  #bodyElement = null;
  #container = null;
  #footerElement = null;
  #moviesModel = null;
  #containerView = null;
  #navigationMenuView = null;
  #sortingView = null;

  #messageView = new MessageView;
  #buttonView = new ButtonView;

  #movies = [];
  #counterNumber = COUNTER;
  #collectionMovieCard = new Map ();


  constructor (container, footerElement, moviesModel, bodyElement, containerView, navigationMenuView, sortingView) {
    this.#bodyElement = bodyElement;
    this.#container = container;
    this.#footerElement = footerElement;
    this.#moviesModel = moviesModel;
    this.#movies = this.#moviesModel.movies;
    this.#containerView = containerView;
    this.#navigationMenuView = navigationMenuView;
    this.#sortingView = sortingView;
  }

  init = () => {
    this.#checkFilmContainer ();
  };


  #checkFilmContainer () {
    if (this.#movies.every ((data) => data.isArchive)) {
      this.#removeSortingView ();
      this.#renderMessageView ();
    } else {
      this.#removeMessageView ();
      this.#renderSortingView ();
      this.#transferData ();
    }
  }


  #removeSortingView () {
    remove (this.#sortingView);
  }


  #renderMessageView () {
    render(this.#messageView, this.#containerView.element, RenderPosition.AFTERBEGIN);
  }


  #removeMessageView () {
    remove (this.#messageView);
  }


  #renderSortingView () {
    render(this.#sortingView, this.#navigationMenuView.element, RenderPosition.AFTEREND);
  }


  setChangeData (temporaryDatas) {
    this.#movies = temporaryDatas;
    this.#counterNumber = COUNTER;
    this.#collectionMovieCard.forEach ((movieCard) => movieCard.destroy());
    this.#collectionMovieCard.clear ();
    this.#checkFilmContainer ();
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
      this.#renderButtonView ();
    }
  }


  #renderButtonView () {
    render(this.#buttonView, this.#container, RenderPosition.AFTEREND);
    this.#buttonView.setClickHandler (this.#renderMoreCards);
  }


  #removeButton () {
    if (this.#counterNumber >= this.#movies.length) {
      remove (this.#buttonView);
    }
  }


  #renderMovieCardAndPopup (data) {
    const movieCardPresenter = new MovieCardPresenter (this.#container, this.#footerElement, this.#bodyElement, this.#movieChange);
    movieCardPresenter.init (data);
    this.#collectionMovieCard.set (data.id, movieCardPresenter);
  }


  #movieChange = (updatedMovie) => {
    this.#movies = updateItem (this.#movies, updatedMovie);
    this.#collectionMovieCard.get (updatedMovie.id).init (updatedMovie);
  };

}
