import AbstractView from '../framework/view/abstract-view.js';

const SORT_NAME = [
  'Sort by default',
  'Sort by date',
  'Sort by rating'
];

const createSorting = (currentSortType) => `<ul class="sort">
<li><a href="#" class="sort__button ${currentSortType === 'Sort by default' ? 'sort__button--active' : ''}">Sort by default</a></li>
<li><a href="#" class="sort__button ${currentSortType === 'Sort by date' ? 'sort__button--active' : ''}">Sort by date</a></li>
<li><a href="#" class="sort__button ${currentSortType === 'Sort by rating' ? 'sort__button--active' : ''}">Sort by rating</a></li>
</ul>`;

export default class SortingView extends AbstractView {
  #sortButtons = null;
  #currentSortType = '';

  constructor (currentSortType) {
    super ();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSorting (this.#currentSortType);
  }


  setClickHandler (callback) {
    this._callback.click = callback;
    this.#sortButtons = this.element.querySelectorAll ('.sort__button');
    for (let i = 0; i < this.#sortButtons.length; i++) {
      this.#sortButtons[i].addEventListener ('click', (evt) => {
        this.#checkClass (evt);
        this.#click (SORT_NAME [i]);
      });
    }
  }


  #click = (sortName) => {
    this._callback.click (sortName);
  };


  #checkClass (evt) {
    for (const sortButton of this.#sortButtons) {
      if (sortButton.classList.contains ('sort__button--active')) {
        sortButton.classList.remove ('sort__button--active');
      }
    }
    evt.target.classList.add ('sort__button--active');
  }
}
