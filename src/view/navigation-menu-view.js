import AbstractView from '../framework/view/abstract-view.js';

const FILTER_NAME = [
  'all',
  'watchlist',
  'alreadyWatched',
  'favorite'
];

const createFilter = (filters, filter) => {
  const filters1 = filters [1];
  const filters2 = filters [2];
  const filters3 = filters [3];

  return `<nav class="main-navigation">
<a href="#all" class="main-navigation__item ${filters [0].type === filter ? 'main-navigation__item--active' : ''}">All movies</a>
<a href="#watchlist" class="main-navigation__item ${filters1.type === filter ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count">${filters1.count}</span></a>
<a href="#history" class="main-navigation__item ${filters2.type === filter ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count">${filters2.count}</span></a>
<a href="#favorites" class="main-navigation__item ${filters3.type === filter ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">${filters3.count}</span></a>
</nav>`;
};


export default class NavigationMenuView extends AbstractView {
  #filters = [];
  #buttons = [];
  #filter = '';

  constructor (filters, filter) {
    super ();
    this.#filters = filters;
    this.#filter = filter;
  }

  get template() {
    return createFilter(this.#filters, this.#filter);
  }


  setClickHandler (callback) {
    this._callback.click = callback;
    this.#buttons = this.element.querySelectorAll ('.main-navigation__item');
    for (let i = 0; i < this.#buttons.length; i++) {
      this.#buttons[i].addEventListener ('click', () => {
        this.#click (FILTER_NAME [i]);
      });
    }
  }


  #click = (filterName) => {
    this._callback.click (filterName);
  };
}
