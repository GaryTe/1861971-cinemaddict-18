import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDateMonthYear, humanizeHour, humanizeMinute, getRandomInteger, humanizeDateMonthYearHourMinute} from '../utils.js';


const createPopup = (data) => {
  const {index, filmInfo, comments, userDetails, emoji, description} = data;

  const getGenre = () => {
    const datas = filmInfo.genre.slice (0,getRandomInteger (0, 2));
    datas.unshift (filmInfo.genre[index]);
    return datas;
  };

  const genres = getGenre();


  const putEmotion = () => {
    if (emoji === null){
      return '' ;
    }
    return `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji"></img>`;
  };


  function getListComments () {
    const listComments = [];
    for(let i = 0; i < comments.length; i++){
      const {author, comment, emotion, date} = comments [i];
      const descriptionsComment = `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${humanizeDateMonthYearHourMinute (date)}</span>
          <button class="film-details__comment-delete">Delete</button>
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
            <td class="film-details__term">${genres.length > 1 ? 'Genres' : 'Genre'}</td>
            <td class="film-details__cell">
              <span class="film-details__genre">${genres [0]}</span>
              ${genres [1] !== undefined ? `<span class="film-details__genre">${genres [1]}</span>` : '<span class="film-details__genre"></span>'}
              ${genres [2] !== undefined ? `<span class="film-details__genre">${genres [2]}</span>` : '<span class="film-details__genre"></span>'}
              </td>
          </tr>
        </table>

        <p class="film-details__film-description">
          ${filmInfo.description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist ${userDetails.watchlist === true ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--watched ${userDetails.alreadyWatched === true ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite ${userDetails.favorite === true ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>

  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">${getListComments ().join ('')}</ul>

      <form class="film-details__new-comment" action="" method="get">
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

  constructor (data) {
    super ();
    this._state = PopupView.popupToState (data);
    this.#setInnerHandlers ();
    this.#scroll ();
  }


  get template() {
    return createPopup(this._state);
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


  setDeleteComment (callback) {
    this._callback.deleteComment = callback;
    const buttons = this.element.querySelectorAll ('.film-details__comment-delete');
    for (let i = 0; i < buttons.length; i++) {
      buttons [i].addEventListener ('click', () => {
        this.#deleteComment (i);
      });
    }
  }


  #deleteComment = (id) => {
    this._callback.deleteComment (id, this.#scrollCoordinate);
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
    this._callback.addToWatchlis (this.#scrollCoordinate);
  };


  setAlreadyWatched (callback) {
    this._callback.alreadyWatched = callback;
    this.element.querySelector ('.film-details__control-button--watched').addEventListener ('click', this.#alreadyWatched);
  }


  #alreadyWatched = () => {
    this._callback.alreadyWatched (this.#scrollCoordinate);
  };


  setAddToFavorites (callback) {
    this._callback.addToFavorites = callback;
    this.element.querySelector ('.film-details__control-button--favorite').addEventListener ('click', this.#addToFavorites);
  }


  #addToFavorites = () => {
    this._callback.addToFavorites (this.#scrollCoordinate);
  };


  #setInnerHandlers () {
    const emotions = this.element.querySelectorAll ('.film-details__emoji-item');
    for (const emotion of emotions) {
      emotion.addEventListener ('change', this.#choiceOfEmotion);
    }
    this.element.querySelector ('.film-details__comment-input').addEventListener ('input', this.#descriptionInputHandler);
  }


  #choiceOfEmotion = (evt) => {
    evt.preventDefault();
    this.updateElement ({
      emoji: evt.target.value
    });
    this.element.scrollBy (0, this.#scrollCoordinate);
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
    this._callback.returnNewMovie (PopupView.parseStateToData (this._state));
  };


  static popupToState = (popup) => ({...popup, emoji: null, description: null});


  static parseStateToData = (state) => state;
}
