import AbstractView from '../framework/view/abstract-view.js';

const FILTER_NAME = [
  'all',
  'watchlist',
  'alreadyWatched',
  'favorite'
];

const createFilter = (data) => {
  const {watchlist, alreadyWatched, favorite} = data;

  return `<nav class="main-navigation">
<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
<a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
<a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${alreadyWatched}</span></a>
<a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
</nav>`;
};

export default class NavigationMenuView extends AbstractView {
  #data = {};
  #buttons = [];

  constructor (data) {
    super ();
    this.#data = data;
  }

  get template() {
    return createFilter(this.#data);
  }


  setClickHandler (callback) {
    this._callback.click = callback;
    this.#buttons = this.element.querySelectorAll ('.main-navigation__item');
    for (let i = 0; i < this.#buttons.length; i++) {
      this.#buttons[i].addEventListener ('click', (evt) => {
        this.#checkClass (evt);
        this.#click (FILTER_NAME [i]);
      });
    }
  }


  #click = (filterName) => {
    this._callback.click (filterName);
  };


  #checkClass (evt) {
    for (const button of this.#buttons) {
      if (button.classList.contains ('main-navigation__item--active')) {
        button.classList.remove ('main-navigation__item--active');
      }
    }
    evt.target.classList.add ('main-navigation__item--active');
  }

}
