import AbstractView from '../framework/view/abstract-view.js';

const createButton = () => '<button class="films-list__show-more">Show more</button>';

export default class ButtonView extends AbstractView {

  get template() {
    return createButton();
  }


  setClickHandler (callback) {
    this._callback.click = callback;
    this.element.addEventListener ('click', this.#click);
  }


  #click = () => {
    this._callback.click ();
  };
}
