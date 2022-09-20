import ButtonView from '../view/button-view.js';
import MessageView from '../view/message-view.js';
import MovieCardPresenter from './movie-cards-presenter.js';
import SortingView from '../view/sorting-view.js';
import PopupPresenter from './popup-presenter.js';
import {RenderPosition, render, remove} from '../framework/render.js';
import {UserAction, UpdateType, SortType, FilterType} from '../const.js';
import {sortByDate, sortByRating, sortDataByKey, gettingValues} from '../utils.js';

const COUNTER = 5;

export default class MasterPresenter {
  #bodyElement = null;
  #container = null;
  #footerElement = null;
  #moviesModel = null;
  #containerView = null;
  #buttonView = null;
  #filterModel = null;
  #sortingView = null;
  #messageView = null;
  #popup = null;


  #filterType = FilterType.ALL;
  #counterNumber = COUNTER;
  #collectionMovieCard = new Map ();
  #currentSortType = SortType.SORT_BY_DEFAULT;


  constructor (container, footerElement, moviesModel, bodyElement, containerView, filterModel) {
    this.#bodyElement = bodyElement;
    this.#container = container;
    this.#footerElement = footerElement;
    this.#moviesModel = moviesModel;
    this.#containerView = containerView;
    this.#filterModel = filterModel;

    this.#moviesModel.addObserver (this.#handleModelEvent);
    this.#filterModel.addObserver (this.#handleModelEvent);
  }


  get movies () {
    this.#filterType = this.#filterModel.filter;
    const movies = this.#moviesModel.movies;
    const filteredMovies = sortDataByKey (this.#filterType, movies);

    switch (this.#currentSortType) {
      case SortType.SORT_BY_DATE:
        return sortByDate(filteredMovies);
      case SortType.SORT_BY_RETING:
        return sortByRating(filteredMovies);
    }
    return filteredMovies;

  }


  init = () => {
    this.#checkFilmContainer ();
  };


  #checkFilmContainer = () => {
    const movies = this.movies;
    const movieCount = movies.length;

    if (movieCount === 0) {
      this.#removeSortingView ();
      this.#renderMessageView ();
      return;
    }

    this.#removeMessageView ();
    this.#renderSortingView ();

    this.#renderMoreCards(movies.slice(0, Math.min(movieCount, this.#counterNumber)));

    if (movieCount > COUNTER) {
      this.#renderButtonView ();
    }

  };


  #removeSortingView = () => {
    remove (this.#sortingView);
  };


  #renderMessageView = () => {
    this.#messageView = new MessageView (this.#filterType);
    render(this.#messageView, this.#containerView.element, RenderPosition.AFTERBEGIN);
  };


  #removeMessageView = () => {
    remove (this.#messageView);
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedMovieCount: true});
    this.#checkFilmContainer ();
  };


  #renderSortingView = () => {
    this.#sortingView = new SortingView (this.#currentSortType);
    this.#sortingView.setClickHandler(this.#handleSortTypeChange);
    render(this.#sortingView, this.#containerView.element, RenderPosition.BEFOREBEGIN);
  };


  #renderMoreCards = (movies) => {
    movies.forEach ((value) => this.#renderMovieCardAndPopup (value));
  };


  #renderButtonView = () => {
    this.#buttonView = new ButtonView ();
    render(this.#buttonView, this.#container, RenderPosition.AFTEREND);
    this.#buttonView.setClickHandler (this.#renderAdditionalMovieCards);
  };


  #renderAdditionalMovieCards = () => {
    const moviesCount = this.movies.length;
    const newRenderMovies = Math.min(moviesCount, this.#counterNumber + COUNTER);
    const movies = this.movies.slice(this.#counterNumber, newRenderMovies);

    this.#renderMoreCards(movies);
    this.#counterNumber = newRenderMovies;

    if (this.#counterNumber >= this.movies.length) {
      this.#removeButton ();
    }
  };


  #removeButton = () => {
    remove (this.#buttonView);
  };


  #renderMovieCardAndPopup = (data) => {
    const movieCardPresenter = new MovieCardPresenter (this.#container, this.#checkBeforeUpgrade,
      gettingValues (this.#filterModel.filter), this.#renderPopup);
    movieCardPresenter.init (data);
    this.#collectionMovieCard.set (data.id, movieCardPresenter);
  };


  #addMovieBeforeDelet = (actionType, update) => {
    if (actionType === 'DELETE_TASK') {
      this.#moviesModel.movies = update;
    }
  };


  #checkBeforeUpgrade = (actionType, updateType, update, filter) => {
    if (this.#filterModel.filter === filter && update.userDetails[filter] === false || this.#filterModel.filter === 'all') {
      this.#handleViewAction (actionType, updateType, update);
      this.#addMovieBeforeDelet (actionType, update);
      return;
    }
    if (this.#collectionMovieCard.get (update.id) === undefined) {
      const index = this.#moviesModel.movies.findIndex((movie) => movie.id === update.id);
      this.#moviesModel.movies.splice(index, 1, update);
      this.#handleViewAction (
        actionType = UserAction.ADD_TASK,
        updateType = UpdateType.MINOR,
        update
      );
      return;
    }
    this.#handleViewAction (
      actionType = UserAction.UPDATE_TASK,
      updateType = UpdateType.PATCH,
      update
    );
  };


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#moviesModel.updatedMovie(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#moviesModel.addMovie(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#moviesModel.deleteMovie(updateType, update);
        break;
    }
  };


  #handleModelEvent = (updateType, updatedMovie) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#collectionMovieCard.get (updatedMovie.id).init (updatedMovie);
        if (this.#popup !== null) {
          this.#popup.init (updatedMovie);
        }
        break;
      case UpdateType.MINOR:
        this.#clearBoard ();
        this.#checkFilmContainer ();
        if (this.#popup !== null) {
          this.#popup.init (updatedMovie);
        }
        /*
        if (this.#collectionMovieCard.get (updatedMovie.id) !== undefined) {
          this.#collectionMovieCard.get (updatedMovie.id).init (updatedMovie);
        }
        */
        break;
      case UpdateType.MAJOR:
        this.#clearBoard ({resetRenderedMovieCount: true, resetSortType: true});
        this.#checkFilmContainer ();
        break;
    }
  };


  #clearBoard = ({resetRenderedMovieCount = false, resetSortType = false} = {}) => {
    const movieCount = this.movies.length;

    this.#collectionMovieCard.forEach ((movieCard) => movieCard.destroy());
    this.#collectionMovieCard.clear();

    this.#removeSortingView ();
    this.#removeMessageView ();
    this.#removeButton ();

    if (resetRenderedMovieCount) {
      this.#counterNumber = COUNTER;
    } else {
      this.#counterNumber = Math.min(movieCount, this.#counterNumber);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.SORT_BY_DEFAULT;
    }
  };


  #renderPopup = (movie) => {
    document.addEventListener('keydown',this.#closePopupKey);
    this.#checkOpenPopups ();
    this.#popup = new PopupPresenter (this.#footerElement, this.#closPopup, this.#checkBeforeUpgrade, this.#bodyElement,
      gettingValues (this.#filterModel.filter));
    this.#popup.init (movie);
    this.#bodyElement.classList.add ('hide-overflow');
  };


  #checkOpenPopups () {
    if (this.#popup !== null) {
      remove (this.#popup.prevPopup);
    }
  }


  #closePopupKey = (evt) => {
    if(evt.key === 'Esc' || evt.key === 'Escape') {
      this.#closPopup();
      document.removeEventListener('keydown', this.#closePopupKey);
    }
  };


  #closPopup = () => {
    document.removeEventListener('keydown', this.#closePopupKey);
    const popupElement = document.querySelector ('.film-details');
    this.#bodyElement.removeChild (popupElement);
    this.#bodyElement.classList.remove ('hide-overflow');
  };

}
