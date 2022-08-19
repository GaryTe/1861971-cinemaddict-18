import {createElement} from '../render.js';

const createButton = () => '<button class="films-list__show-more">Show more</button>';

export default class ButtonView {
  #element = null;

  get template() {
    return createButton();
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
