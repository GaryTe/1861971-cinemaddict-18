import AbstractView from '../framework/view/abstract-view.js';


const createSorting = (currentSortType) => `<ul class="sort">
<li><a href="#" class="sort__button ${currentSortType === 'Sort by default' ? 'sort__button--active' : ''}" name = 'Sort by default'>Sort by default</a></li>
<li><a href="#" class="sort__button ${currentSortType === 'Sort by date' ? 'sort__button--active' : ''}" name = 'Sort by date'>Sort by date</a></li>
<li><a href="#" class="sort__button ${currentSortType === 'Sort by rating' ? 'sort__button--active' : ''}" name = 'Sort by rating'>Sort by rating</a></li>
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
    this.element.addEventListener ('click', (evt) => {
      if (evt.target.nodeName === 'A') {
        this.#checkClass (evt);
        this.#click (evt.target.name);
      }
    });
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
