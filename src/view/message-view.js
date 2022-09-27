import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const TextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies in our watchlist',
  [FilterType.ALREADY_WATCHED]: 'There are no movies in our history',
  [FilterType.FAVORITE]: 'There are no movies in our favorites',
};

const createButton = (filterType) => `<h2 class="films-list__title">${TextType [filterType]}</h2>`;

export default class MessageView extends AbstractView {
  #filterType = '';

  constructor (filterType) {
    super ();
    this.#filterType = filterType;
  }

  get template() {
    return createButton(this.#filterType);
  }
}
