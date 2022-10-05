import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDateMonthYear, humanizeHour, humanizeMinute, humanizeDateMonthYearHourMinute} from '../utils.js';
import { UserAction } from '../const.js';
import he from 'he';


const createPopup = (data, commentatorsData) => {
  const {filmInfo, comments, userDetails, emoji, description, isDisabled, isDeleting, isLockForm, isLockButton} = data;


  const putEmotion = () => {
    if (emoji === null){
      return '' ;
    }
    return `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji"></img>`;
  };


  function getListComments () {
    const listComments = [];
    for (const commentary of commentatorsData) {
      const {author, comment, emotion, date} = commentary;
      const descriptionsComment = `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${humanizeDateMonthYearHourMinute (date)}</span>
          <button class="film-details__comment-delete ${isDisabled ? 'disabled' : ''}">${isDeleting ? 'Deleting' : 'Delete'}</button>
        </p>
      </div>
    </li>`;
      listComments.push(descriptionsComment);
    }
    return listComments;
  }

  return (`<section class="film-details">
<div class="film-details__inner">
  <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

        <p class="film-details__age">${filmInfo.ageRating}</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${filmInfo.title}</h3>
            <p class="film-details__title-original">Original: ${filmInfo.title}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${filmInfo.totalRating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${filmInfo.director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${filmInfo.writers}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${filmInfo.actors}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${humanizeDateMonthYear (filmInfo.release.date)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${`${humanizeHour (filmInfo.release.date)}h ${humanizeMinute (filmInfo.release.date)}m`}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${filmInfo.genre.length > 1 ? 'Genres' : 'Genre'}</td>
            <td class="film-details__cell">
              <span class="film-details__genre">${filmInfo.genre.join (' , ')}</span>
            </td>
          </tr>
        </table>

        <p class="film-details__film-description">
          ${filmInfo.description}
        </p>
      </div>
    </div>

    <section class="film-details__controls ${isLockButton ? 'disabled' : ''}">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist ${userDetails.watchlist === true ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--watched ${userDetails.alreadyWatched === true ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite ${userDetails.favorite === true ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>

  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">${getListComments ().join ('')}</ul>

      <form class="film-details__new-comment ${isLockForm ? 'disabled' : ''}" action="" method="get">
        <div class="film-details__add-emoji-label">${putEmotion ()}</div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${description === null ? '' : description}</textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </form>
    </section>
  </div>
</div>
</section>`);
};

export default class PopupView extends AbstractStatefulView {
  #scrollCoordinate = 0;
  #comments = [];

  constructor (data, comments) {
    super ();
    this._state = PopupView.popupToState (data);
    this.#comments = comments;
    this.#setInnerHandlers ();
    this.#scroll ();
  }

  get template() {
    return createPopup(this._state, this.#comments);
  }


  update (data, comments) {
    this.#comments = comments;
    this.updateElement ({...PopupView.popupToState (data)});
    this.restoreScroll ();
  }


  _restoreHandlers = () => {
    this.#setInnerHandlers ();
    this.#scroll ();
    this.setClickHandler (this._callback.click);
    this.setAddToWatchlis (this._callback.addToWatchlis);
    this.setAlreadyWatched (this._callback.alreadyWatched);
    this.setAddToFavorites (this._callback.addToFavorites);
    this.setDeleteComment (this._callback.deleteComment);
    this.setReturnNewMovie (this._callback.returnNewMovie);
  };


  #scroll = () => {
    this.element.addEventListener ('scroll', () => {
      this.#scrollCoordinate = this.element.scrollTop;
    });
  };


  restoreScroll () {
    this.element.scrollBy (0, this.#scrollCoordinate);
  }


  setDeleteComment (callback) {
    this._callback.deleteComment = callback;
    const buttons = this.element.querySelectorAll ('.film-details__comment-delete');
    for (let i = 0; i < buttons.length; i++) {
      buttons [i].addEventListener ('click', () => {
        this.#deleteComment (this.#comments [i]);
      });
    }
  }


  #deleteComment = (comment) => {
    this._callback.deleteComment (comment);
  };


  setClickHandler (callback) {
    this._callback.click = callback;
    this.element.querySelector ('.film-details__close-btn').addEventListener ('click', this.#click);
  }


  #click = () => {
    this._callback.click ();
  };


  setAddToWatchlis (callback) {
    this._callback.addToWatchlis = callback;
    this.element.querySelector ('.film-details__control-button--watchlist').addEventListener ('click', this.#addToWatchlis);
  }


  #addToWatchlis = () => {
    this._callback.addToWatchlis ();
  };


  setAlreadyWatched (callback) {
    this._callback.alreadyWatched = callback;
    this.element.querySelector ('.film-details__control-button--watched').addEventListener ('click', this.#alreadyWatched);
  }


  #alreadyWatched = () => {
    this._callback.alreadyWatched ();
  };


  setAddToFavorites (callback) {
    this._callback.addToFavorites = callback;
    this.element.querySelector ('.film-details__control-button--favorite').addEventListener ('click', this.#addToFavorites);
  }


  #addToFavorites = () => {
    this._callback.addToFavorites ();
  };


  #setInnerHandlers () {
    const emotions = this.element.querySelectorAll ('.film-details__emoji-item');
    for (const emotion of emotions) {
      emotion.addEventListener ('change', this.#chooseEmotion);
    }
    this.element.querySelector ('.film-details__comment-input').addEventListener ('input', this.#descriptionInputHandler);
  }


  #chooseEmotion = (evt) => {
    evt.preventDefault();
    this.updateElement ({
      emoji: evt.target.value
    });
    this.restoreScroll ();
  };


  #descriptionInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      description: evt.target.value
    });
  };


  setReturnNewMovie (callback) {
    this._callback.returnNewMovie = callback;
    this.element.querySelector('.film-details__new-comment').addEventListener('keydown', (evt) => {
      if (evt.key === 'Control') {return;}
      if (evt.ctrlKey && evt.key === 'Enter') {
        this.#parseStateToData ();
      }
    });
  }


  #parseStateToData = () => {
    this._callback.returnNewMovie ({
      id: this._state.id,
      emoji: this._state.emoji,
      description: this._state.description
    });
    delete this._state.isDisabled;
    delete this._state.isDeleting;
    delete this._state.isLockForm;
    delete this._state.isLockButton;
  };


  static popupToState = (popup) => ({
    ...popup, emoji: null,
    description: null,
    isDisabled: false,
    isDeleting: false,
    isLockForm: false,
    isLockButton: false
  });


  static parseStateToData = (state) => state;


  shakeControls = (popup, uiBlocker, userAction) => {
    const filmDetailsComment = this.element.querySelector ('.film-details__comments-list');
    const filmDetailsNewComment = this.element.querySelector ('.film-details__new-comment');
    const filmDetailsControls = this.element.querySelector ('.film-details__controls');

    uiBlocker.unblock ();

    const setDeleting = () => {
      popup.updateElement ({
        isDisabled: false,
        isDeleting: false
      });
      this.restoreScroll ();
    };

    const setLockForm = () => {
      popup.updateElement ({
        isLockForm: false
      });
      this.restoreScroll ();
    };
    switch (userAction) {
      case UserAction.DELETE_COMMENT:
        this.shake.call ({element: filmDetailsComment});
        setTimeout (setDeleting, this._SHAKE_ANIMATION_TIMEOUT);
        break;

      case UserAction.ADD_COMMENT:
        this.shake.call ({element: filmDetailsNewComment});
        setTimeout (setLockForm, this._SHAKE_ANIMATION_TIMEOUT);
        break;

      default:
        this.shake.call ({element: filmDetailsControls});
        break;

    }

  };
}
