import {createElement} from '../render.js';

const createNumberOfFilms = () => '<p>130 291 movies inside</p>';

export default class NumberOfFilmsView {
  #element = null;

  get template() {
    return createNumberOfFilms();
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
