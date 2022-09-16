import ButtonView from '../view/button-view.js';
import MessageView from '../view/message-view.js';
import MovieCardPresenter from './movie-cards-presenter.js';
import SortingView from '../view/sorting-view.js';
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
  #key = null;


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
    const tasks = this.#moviesModel.movies;
    const filteredMovies = sortDataByKey (this.#filterType, tasks);

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
    this.#key = gettingValues (this.#filterModel.filter);

    if (movieCount === 0) {
      this.#removeSortingView ();
      this.#renderMessageView ();
      return;
    }

    this.#removeMessageView ();
    this.#renderSortingView ();

    // Теперь, когда #renderBoard рендерит доску не только на старте,
    // но и по ходу работы приложения, нужно заменить
    // константу TASK_COUNT_PER_STEP на свойство #renderedTaskCount,
    // чтобы в случае перерисовки сохранить N-показанных карточек
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
    this.#clearBoard({resetRenderedTaskCount: true});
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
    const tasks = this.movies.slice(this.#counterNumber, newRenderMovies);

    this.#renderMoreCards(tasks);
    this.#counterNumber = newRenderMovies;

    if (this.#counterNumber >= this.movies.length) {
      this.#removeButton ();
    }
  };


  #removeButton = () => {
    remove (this.#buttonView);
  };


  #renderMovieCardAndPopup = (data) => {
    const movieCardPresenter = new MovieCardPresenter (this.#container, this.#footerElement, this.#bodyElement, this.#handleViewAction,
      this.#key);
    movieCardPresenter.init (data);
    this.#collectionMovieCard.set (data.id, movieCardPresenter);
  };


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#moviesModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#moviesModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#moviesModel.deleteTask(updateType, update);
        break;
    }
  };


  #handleModelEvent = (updateType, updatedMovie) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#collectionMovieCard.get (updatedMovie.id).init (updatedMovie);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearBoard ();
        this.#checkFilmContainer ();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard ({resetRenderedTaskCount: true, resetSortType: true});
        this.#checkFilmContainer ();
        break;
    }
  };


  #clearBoard = ({resetRenderedTaskCount = false, resetSortType = false} = {}) => {
    const movieCount = this.movies.length;

    this.#collectionMovieCard.forEach ((movieCard) => movieCard.destroy());
    this.#collectionMovieCard.clear();

    this.#removeSortingView ();
    this.#removeMessageView ();
    this.#removeButton ();

    if (resetRenderedTaskCount) {
      this.#counterNumber = COUNTER;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this.#counterNumber = Math.min(movieCount, this.#counterNumber);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.SORT_BY_DEFAULT;
    }
  };
}
