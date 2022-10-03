import PopupView from '../view/popup-view.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import {UpdateType, UserAction} from '../const.js';


export default class PopupPresenter {
  #movie = null;
  #popup = null;
  #footerElement = null;
  #closPopup = null;
  #popupChange = null;
  #handleActionCommentsModel = null;


  constructor (footerElement, closPopup, popupChange, handleActionCommentsModel) {
    this.#footerElement = footerElement;
    this.#closPopup = closPopup;
    this.#popupChange = popupChange;
    this.#handleActionCommentsModel = handleActionCommentsModel;
  }


  get prevPopup () {return this.#popup;}


  init (movie, comments) {

    this.#movie = movie;
    const prevPopup = this.#popup;

    if (prevPopup === null) {
      this.#popup = new PopupView (movie, comments);
      render(this.#popup, this.#footerElement, RenderPosition.AFTEREND);
      this.#addHandlersToPopup ();
      return;
    }

    this.#popup.update (movie, comments);
  }


  destroy () {
    remove(this.#popup);
  }


  #addHandlersToPopup = () => {
    this.#popup.setClickHandler (this.#closPopup);
    this.#popup.setAddToWatchlis (this.#addToWatchlis);
    this.#popup.setAddToFavorites (this.#addToFavorites);
    this.#popup.setAlreadyWatched (this.#alreadyWatched);
    this.#popup.setDeleteComment (this.#deleteComment);
    this.#popup.setReturnNewMovie (this.#setNewMovie);
  };


  #setNewMovie = (comment) => {
    this.#handleActionCommentsModel (
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      comment
    );
  };


  #addToWatchlis = () => {
    this.#popupChange (
      UserAction.UPDATE_MOVIE,
      UpdateType.MAJOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails,watchlist : !this.#movie.userDetails.watchlist}},
    );
  };


  #alreadyWatched = () => {
    this.#popupChange (
      UserAction.UPDATE_MOVIE,
      UpdateType.MAJOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails,alreadyWatched : !this.#movie.userDetails.alreadyWatched}},
    );
  };


  #addToFavorites = () => {
    this.#popupChange (
      UserAction.UPDATE_MOVIE,
      UpdateType.MAJOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails,favorite : !this.#movie.userDetails.favorite}},
    );
  };


  #deleteComment = (commentary) => {
    this.#handleActionCommentsModel (
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {...this.#movie, comments: [...this.#movie.comments.filter ((comment) => comment !== commentary.id)]},
      commentary
    );
  };

  setDeleting = () => {
    this.#popup.updateElement ({
      isDisabled: true,
      isDeleting: true
    });
    this.#popup.restoreScroll ();
  };


  setLockForm = () => {
    this.#popup.updateElement ({
      isLockForm: true
    });
    this.#popup.restoreScroll ();
  };


  setLockButton = () => {
    this.#popup.updateElement ({
      isLockButton: true
    });
    this.#popup.restoreScroll ();
  };


  setAborting (uiBlocker, userAction) {
    this.#popup.shakeControls (this.#popup, uiBlocker, userAction);
  }

}
