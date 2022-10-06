import AbstractView from '../framework/view/abstract-view.js';
import { humanizeYear, humanizeHour, humanizeMinute} from '../utils.js';

const createMovieCard = (data) => {
  const {filmInfo,comments, userDetails} = data;

  return (`<article class="film-card">
<a class="film-card__link">
  <h3 class="film-card__title">${filmInfo.title}</h3>
  <p class="film-card__rating">${filmInfo.totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${humanizeYear (filmInfo.release.date)}</span>
    <span class="film-card__duration">${`${humanizeHour (filmInfo.release.date)}h ${humanizeMinute (filmInfo.release.date)}m`}</span>
    <span class="film-card__genre">
    ${filmInfo.genre.join (' , ')}
    </span>
  </p>
  <img src="${filmInfo.poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${filmInfo.description.length === 140 ? filmInfo.description : `${filmInfo.description.slice(0, 139)}...`}</p>
  <span class="film-card__comments">${`${comments.length} comments`}</span>
</a>
<div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${userDetails.watchlist === true ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${userDetails.alreadyWatched === true ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite ${userDetails.favorite === true ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
</div>
</article>`);
};

export default class MovieCardView extends AbstractView{

  #data = {};

  constructor (data) {
    super ();
    this.#data = data;
  }


  get template () {
    return createMovieCard(this.#data);
  }


  shakeControls = (uiBlocker) => {
    uiBlocker ();
    const filmCardControls = this.element.querySelector ('.film-card__controls');
    this.shakeAbsolute.call ({element: filmCardControls});
  };


  setClickHandler (callback) {
    this._callback.click = callback;
    this.element.querySelector ('.film-card__link').addEventListener ('click', this.#click);
  }


  setAddToWatchlis (callback) {
    this._callback.addToWatchlis = callback;
    this.element.querySelector ('.film-card__controls-item--add-to-watchlist').addEventListener ('click', this.#addToWatchlis);
  }


  setAlreadyWatched (callback) {
    this._callback.alreadyWatched = callback;
    this.element.querySelector ('.film-card__controls-item--mark-as-watched').addEventListener ('click', this.#alreadyWatched);
  }


  setAddToFavorites (callback) {
    this._callback.addToFavorites = callback;
    this.element.querySelector ('.film-card__controls-item--favorite').addEventListener ('click', this.#addToFavorites);
  }


  #click = () => {
    this._callback.click (null, null, this.#data);
  };


  #addToWatchlis = () => {
    this._callback.addToWatchlis ();
  };


  #alreadyWatched = () => {
    this._callback.alreadyWatched ();
  };


  #addToFavorites = () => {
    this._callback.addToFavorites ();
  };

}
