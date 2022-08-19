import {createElement} from '../render.js';
import { humanizeYear, humanizeHour, humanizeMinute } from '../utils.js';

const createMovieCard = (data) => {
  const {index,filmInfo,comments} = data;

  return (`<article class="film-card">
<a class="film-card__link">
  <h3 class="film-card__title">${filmInfo.title}</h3>
  <p class="film-card__rating">${filmInfo.totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${humanizeYear (filmInfo.release.date)}</span>
    <span class="film-card__duration">${`${humanizeHour (filmInfo.release.date)}h ${humanizeMinute (filmInfo.release.date)}m`}</span>
    <span class="film-card__genre">${filmInfo.genre[index]}</span>
  </p>
  <img src="${filmInfo.poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${filmInfo.description.length === 140 ? filmInfo.description : `${filmInfo.description.slice(0, 139)}...`}</p>
  <span class="film-card__comments">${`${comments.length} comments`}</span>
</a>
<div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
</div>
</article>`);
};

export default class MovieCardView {
  #element = null;
  #data = {};

  constructor (data) {
    this.#data = data;
  }

  get template() {
    return createMovieCard(this.#data);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
