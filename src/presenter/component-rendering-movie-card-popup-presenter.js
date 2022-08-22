import MovieCardView from '../view/movie-card-view.js';
import ButtonView from '../view/button-view.js';
import PopupView from '../view/popup-view.js';
import MessageView from '../view/message-view.js';
import {RenderPosition, render} from '../render.js';

const COUNTER = 5;

export default class ComponentRenderingMovieCardPopupPresenter {
  #parentElements = null;
  #container = null;
  #element = null;
  #receivingDataTransmissionModel = null;
  #containerView = null;
  #sortingView = null;
  #datas = [];
  #messageView = new MessageView;
  #buttonView = new ButtonView;
  #number = COUNTER;


  constructor (container, element, receivingDataTransmissionModel, parentElements, containerView, sortingView) {
    this.#parentElements = parentElements;
    this.#container = container;
    this.#element = element;
    this.#receivingDataTransmissionModel = receivingDataTransmissionModel;
    this.#datas = this.#receivingDataTransmissionModel.tasks;
    this.#containerView = containerView;
    this.#sortingView = sortingView;
  }

  init = () => {
    this.#validationData ();
  };


  #validationData () {
    if (this.#datas.every ((data) => data.isArchive)) {
      this.#sortingView.element.remove ();
      render(this.#messageView, this.#containerView.element, RenderPosition.AFTERBEGIN);
    } else {
      this.#transferData ();
    }
  }


  #renderMoreCards = () => {
    this.#datas
      .slice (this.#number, this.#number + COUNTER)
      .forEach ((value) => this.#renderMovieCardAndPopup (value));

    this.#number += COUNTER;

    this.#removeButton ();
  };


  #transferData () {
    for (let i = 0; i < Math.min (COUNTER, this.#datas.length); i++) {
      this.#renderMovieCardAndPopup (this.#datas[i]);
    }

    if (this.#datas.length > COUNTER) {
      render(this.#buttonView, this.#container, RenderPosition.AFTEREND);
      this.#buttonView.element.addEventListener ('click', this.#renderMoreCards);
    }
  }


  #removeButton () {
    if (this.#number >= this.#datas.length) {
      this.#buttonView.element.remove ();
      this.#buttonView.removeElement ();
    }
  }


  #closePopupKey = (evt) => {
    if(evt.key === 'Esc' || evt.key === 'Escape') {
      this.#closPopup();
      document.removeEventListener('keydown', this.#closePopupKey);
    }
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


  #checkOpenPopups () {
    const childElement = document.querySelectorAll ('.film-details');
    if (childElement.length > 0) {this.#parentElements.removeChild (childElement[0]);}
  }

}
