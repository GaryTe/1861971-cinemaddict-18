import MovieCardView from '../view/movie-card-view.js';
import ButtonView from '../view/button-view.js';
import PopupView from '../view/popup-view.js';
import {RenderPosition, render} from '../render.js';

export default class ComponentRenderingPresenter {
  #parentElements = null;
  #container = null;
  #element = null;
  #receivingDataTransmissionModel = null;
  #datas = [];

  init = (container, element, receivingDataTransmissionModel, parentElements) => {
    this.#parentElements = parentElements;
    this.#container = container;
    this.#element = element;
    this.#receivingDataTransmissionModel = receivingDataTransmissionModel;
    this.#datas = this.#receivingDataTransmissionModel.tasks;

    for (let i = 0; i < this.#datas.length; i++) {
      this.#renderMovieCardAndPopup (this.#datas[i]);
    }

    render(new ButtonView(), this.#container, RenderPosition.AFTEREND);
  };

  #renderMovieCardAndPopup (data) {
    const movieCard = new MovieCardView (data);

    movieCard.element.querySelector ('.film-card__link') .addEventListener ('click', () => {
      document.addEventListener('keydown',this.#closePopupKey);
      this.#checkOpenPopups ();
      const popup = new PopupView (data);
      const closeButton = popup.element.querySelector ('.film-details__close-btn');
      closeButton.addEventListener ('click', () => {
        this.#closPopup ();
      });
      render(popup, this.#element, RenderPosition.AFTEREND);
      this.#parentElements.classList.add ('hide-overflow');
    });

    render(movieCard, this.#container);
  }

  #closPopup () {
    document.removeEventListener('keydown', this.#closePopupKey);
    const childElement = document.querySelector ('.film-details');
    this.#parentElements.removeChild (childElement);
    this.#parentElements.classList.remove ('hide-overflow');
  }

  #closePopupKey (evt) {
    if(evt.key === 'Escape' || evt.key === 'Esc'){
      this.#closPopup();
      document.removeEventListener('keydown', this.#closePopupKey);
    }
  }

  #checkOpenPopups () {
    const childElement = document.querySelectorAll ('.film-details');
    if (childElement.length > 0) {this.#parentElements.removeChild (childElement[0]);}
  }

}
