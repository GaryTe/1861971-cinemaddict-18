import PopupView from '../view/popup-view.js';
import {render, replace, RenderPosition, remove} from '../framework/render.js';
import {UpdateType, UserAction} from '../const.js';


export default class PopupPresenter {
  #movie = null;
  #popup = null;
  #footerElement = null;
  #closPopup = null;
  #popupChange = null;
  #bodyElement = null;
  #film = null;
  #handleActionCommentsModel = null;

  #scrollCoordinate = 0;


  constructor (footerElement, closPopup, popupChange, bodyElement, handleActionCommentsModel) {
    this.#footerElement = footerElement;
    this.#closPopup = closPopup;
    this.#popupChange = popupChange;
    this.#bodyElement = bodyElement;
    this.#handleActionCommentsModel = handleActionCommentsModel;
    this.#popup = new PopupView;
  }


  get prevPopup () {return this.#popup;}


  init (movie, comments) {
    this.#movie = movie;
    this.#popup.init (movie, comments);

    //  const prevPopup = this.#popup;


    this.#addHandlersToPopup ();
    render(this.#popup, this.#footerElement, RenderPosition.AFTEREND);
    /*
    if (prevPopup === null) {

      return;
    }

    if (this.#bodyElement.contains(prevPopup.element)) {
      replace (this.#popup, prevPopup);
      this.#putPopupByCoordinates ();
    }
    */
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


  #putPopupByCoordinates () {
    this.#popup.element.scrollBy (0, this.#scrollCoordinate);
  }


  #setNewMovie = (comment) => {
    this.#handleActionCommentsModel (
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      comment
    );
  };


  #addToWatchlis = (coordinate) => {
    this.#scrollCoordinate = coordinate;
    this.#popupChange (
      UserAction.UPDATE_MOVIE,
      UpdateType.MAJOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails,watchlist : !this.#movie.userDetails.watchlist}},
    );
  };


  #alreadyWatched = (coordinate) => {
    this.#scrollCoordinate = coordinate;
    this.#popupChange (
      UserAction.UPDATE_MOVIE,
      UpdateType.MAJOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails,alreadyWatched : !this.#movie.userDetails.alreadyWatched}},
    );
  };


  #addToFavorites = (coordinate) => {
    this.#scrollCoordinate = coordinate;
    this.#popupChange (
      UserAction.UPDATE_MOVIE,
      UpdateType.MAJOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails,favorite : !this.#movie.userDetails.favorite}},
    );
  };


  #deleteComment = (commentary,coordinate) => {
    this.#scrollCoordinate = coordinate;
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
  };


  setLockForm = () => {
    this.#popup.updateElement ({
      isLockForm: true
    });
  };


  setLockButton = () => {
    this.#popup.updateElement ({
      isLockButton: true
    });
  };


  setAborting (uiBlocker, userAction) {
    this.#popup.shakeControls (this.#popup, uiBlocker, userAction);
  }

}
