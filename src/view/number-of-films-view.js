import AbstractView from '../framework/view/abstract-view.js';

const createNumberOfFilms = (movieCount) => `<p>${movieCount} movies inside</p>`;

export default class NumberOfFilmsView extends AbstractView {
  #movieCount = 0;

  constructor (movieCount) {
    super ();
    this.#movieCount = movieCount;
  }

  get template() {
    return createNumberOfFilms (this.#movieCount);
  }
}
