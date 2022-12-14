import ButtonView from '../view/button-view.js';
import MessageView from '../view/message-view.js';
import MovieCardPresenter from './movie-cards-presenter.js';
import SortingView from '../view/sorting-view.js';
import PopupPresenter from './popup-presenter.js';
import NumberOfFilmsView from '../view/number-of-films-view.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import {RenderPosition, render, remove} from '../framework/render.js';
import {UserAction, UpdateType, SortType, FilterType} from '../const.js';
import {sortByDate, sortByRating, sortDataByKey} from '../utils.js';

const COUNTER = 5;

const TimeLimit = {
  LOWER_LIMIT: 80,
  UPPER_LIMIT: 1000,
};

export default class MasterPresenter {
  #bodyElement = null;
  #containerElement = null;
  #footerElement = null;
  #moviesModel = null;
  #containerView = null;
  #buttonView = null;
  #filterModel = null;
  #sortingView = null;
  #messageView = null;
  #popup = null;
  #numberOfFilmsView = null;
  #sectionElement = null;
  #commentsModel = null;


  #filterType = FilterType.ALL;
  #counterNumber = COUNTER;
  #collectionMovieCard = new Map ();
  #currentSortType = SortType.SORT_BY_DEFAULT;
  #loadingView = new LoadingView;
  #isLoading = true;
  #comments = [];
  #uiBlocker = new UiBlocker (TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);


  constructor (containerElement, footerElement, moviesModel, bodyElement, containerView, filterModel, sectionElement, commentsModel) {
    this.#bodyElement = bodyElement;
    this.#containerElement = containerElement;
    this.#footerElement = footerElement;
    this.#moviesModel = moviesModel;
    this.#containerView = containerView;
    this.#filterModel = filterModel;
    this.#sectionElement = sectionElement;
    this.#commentsModel = commentsModel;

    this.#moviesModel.addObserver (this.#handleModelEvent);
    this.#filterModel.addObserver (this.#handleModelEvent);
    this.#commentsModel.addObserver (this.#handleCommentModelEvent);
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

    if (this.#isLoading) {
      this.#renderLoadingView ();
      return;
    }

    const movies = this.movies;
    const movieCount = movies.length;

    if (movieCount === 0) {
      this.#removeSortingView ();
      this.#renderMessageView ();
      return;
    }

    this.#renderNumberOfFilmsView ();
    this.#removeMessageView ();
    this.#renderSortingView ();

    this.#renderMoreCards(movies.slice(0, Math.min(movieCount, this.#counterNumber)));

    if (movieCount > COUNTER) {
      this.#renderButtonView ();
    }

  };


  #renderLoadingView = () => {
    render(this.#loadingView, this.#containerView.element, RenderPosition.AFTERBEGIN);
  };


  #removeNumberOfFilmsView = () => {
    remove (this.#numberOfFilmsView);
  };


  #renderNumberOfFilmsView = () => {
    this.#numberOfFilmsView = new NumberOfFilmsView (this.#moviesModel.movies.length);
    render(this.#numberOfFilmsView, this.#sectionElement);
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
    render(this.#buttonView, this.#containerElement, RenderPosition.AFTEREND);
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
    const movieCardPresenter = new MovieCardPresenter (this.#containerElement, this.#handleViewAction,
      this.#handleActionCommentsModel);
    movieCardPresenter.init (data);
    this.#collectionMovieCard.set (data.id, movieCardPresenter);
  };


  #clearBoard = ({resetRenderedMovieCount = false, resetSortType = false} = {}) => {
    const movieCount = this.movies.length;

    this.#collectionMovieCard.forEach ((movieCard) => movieCard.destroy());
    this.#collectionMovieCard.clear();

    this.#removeNumberOfFilmsView ();
    this.#removeSortingView ();
    this.#removeMessageView ();
    this.#removeButton ();
    remove (this.#loadingView);

    this.#counterNumber = resetRenderedMovieCount ? COUNTER : Math.min(movieCount, this.#counterNumber);

    if (resetSortType) {
      this.#currentSortType = SortType.SORT_BY_DEFAULT;
    }
  };


  #renderPopup = (movie, comments) => {
    this.#comments = comments;
    document.addEventListener('keydown',this.#closePopupKey);
    this.#checkOpenPopups ();
    this.#popup = new PopupPresenter (this.#footerElement, this.#closePopup, this.#handleViewAction,
      this.#handleActionCommentsModel);
    this.#popup.init (movie, this.#comments);
    this.#bodyElement.classList.add ('hide-overflow');
  };


  #checkOpenPopups () {
    if (this.#popup !== null) {
      remove (this.#popup.prevPopup);
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block ();
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        if (this.#popup !== null) {
          this.#popup.setLockButton ();
        }
        try {
          await this.#moviesModel.updateMovie(updateType, update);
        } catch(err) {
          if (this.#popup !== null) {
            this.#popup.setAborting (this.#uiBlocker, UserAction.UPDATE_MOVIE);
          } else {
            this.#collectionMovieCard.get(update.id).setAborting(this.#uiBlocker);
          }
        }
        break;
    }
    this.#uiBlocker.unblock ();
  };


  #handleModelEvent = (updateType, updatedMovie) => {
    switch (updateType) {
      case UpdateType.MAJOR:
        if (this.#popup !== null) {
          this.#popup.init (updatedMovie, this.#comments);
        }
        this.#clearBoard ({resetRenderedMovieCount: true, resetSortType: true});
        this.#checkFilmContainer ();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingView);
        this.#checkFilmContainer ();
        break;
    }
  };


  #handleActionCommentsModel = async (actionType, updateType, update, comment) => {
    this.#uiBlocker.block ();
    switch (actionType) {
      case UserAction.DELETE_COMMENT:
        this.#popup.setDeleting ();
        try {
          await this.#commentsModel.deleteComment (updateType, update, comment);
        } catch(err) {
          this.#popup.setAborting(this.#uiBlocker, UserAction.DELETE_COMMENT);
        }
        break;
      case UserAction.ADD_COMMENT:
        this.#popup.setLockForm ();
        try {
          await this.#commentsModel.addComment (updateType, update);
        } catch(err) {
          this.#popup.setAborting(this.#uiBlocker, UserAction.ADD_COMMENT);
        }
        break;
      default:
        this.#commentsModel.getComments (update);
        break;
    }
    this.#uiBlocker.unblock ();
  };


  #handleCommentModelEvent = (updateType, updatedMovie) => {
    const {update, comments} = updatedMovie;
    switch (updateType) {
      case UpdateType.PATCH:
        this.#collectionMovieCard.get (update.id).init (update);
        if (this.#popup !== null) {
          this.#popup.init (update, comments);
        }
        break;
      default:
        this.#renderPopup (updateType, updatedMovie);
        break;
    }
  };


  #closePopupKey = (evt) => {
    if(evt.key === 'Esc' || evt.key === 'Escape') {
      this.#closePopup();
      document.removeEventListener('keydown', this.#closePopupKey);
    }
  };


  #closePopup = () => {
    document.removeEventListener('keydown', this.#closePopupKey);
    const popupElement = document.querySelector ('.film-details');
    this.#bodyElement.removeChild (popupElement);
    this.#popup.destroy ();
    this.#popup = null;
    this.#bodyElement.classList.remove ('hide-overflow');
  };

}
