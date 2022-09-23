import PopupView from '../view/popup-view.js';
import {render, replace, RenderPosition} from '../framework/render.js';
import { UpdateType, UserAction, FilterType} from '../const.js';


export default class PopupPresenter {
  #movie = null;
  #popup = null;
  #footerElement = null;
  #closPopup = null;
  #popupChange = null;
  #bodyElement = null;
  #film = null;

  #scrollCoordinate = 0;

  #userAction = UserAction.UPDATE_TASK;
  #updateType = UpdateType.MAJOR;

  constructor (footerElement, closPopup, popupChange, bodyElement, filter) {
    this.#footerElement = footerElement;
    this.#closPopup = closPopup;
    this.#popupChange = popupChange;
    this.#bodyElement = bodyElement;
    this.#userAction = filter.userAction;
    this.#updateType = filter.updateType;
  }


  get prevPopup () {return this.#popup;}


  init (movie) {
    this.#movie = movie;

    const prevPopup = this.#popup;

    this.#popup = new PopupView (movie);

    this.#addHandlersToPopup ();

    if (prevPopup === null) {
      render(this.#popup, this.#footerElement, RenderPosition.AFTEREND);
      return;
    }

    if (this.#bodyElement.contains(prevPopup.element)) {
      replace (this.#popup, prevPopup);
      this.#putPopupByCoordinates ();
    }
  }


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


  #getNewMovie = (movie) => {
    this.#film = movie;
  };


  #addToWatchlis = (coordinate) => {
    this.#scrollCoordinate = coordinate;
    this.#popupChange (
      this.#userAction,
      this.#updateType,
      {...this.#movie, userDetails: {...this.#movie.userDetails,watchlist : !this.#movie.userDetails.watchlist}},
      FilterType.WATCHLIST
    );
  };


  #alreadyWatched = (coordinate) => {
    this.#scrollCoordinate = coordinate;
    this.#popupChange (
      this.#userAction,
      this.#updateType,
      {...this.#movie, userDetails: {...this.#movie.userDetails,alreadyWatched : !this.#movie.userDetails.alreadyWatched}},
      FilterType.ALREADY_WATCHED
    );
  };


  #addToFavorites = (coordinate) => {
    this.#scrollCoordinate = coordinate;
    this.#popupChange (
      this.#userAction,
      this.#updateType,
      {...this.#movie, userDetails: {...this.#movie.userDetails,favorite : !this.#movie.userDetails.favorite}},
      FilterType.FAVORITE
    );
  };


  #deleteComment = (id,coordinate) => {
    this.#scrollCoordinate = coordinate;
    this.#popupChange (
      UserAction.UPDATE_TASK,
      UpdateType.PATCH,
      {...this.#movie, comments: [...this.#movie.comments.filter ((comment) => comment !== this.#movie.comments[id])]}
    );
  };

}
