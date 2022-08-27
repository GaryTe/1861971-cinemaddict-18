import MovieCardView from '../view/movie-card-view.js';
import ButtonView from '../view/button-view.js';
import PopupView from '../view/popup-view.js';
import MessageView from '../view/message-view.js';
import {RenderPosition, render, remove} from '../framework/render.js';

const COUNTER = 5;

export default class MovieCardPopupPresenter {
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
  #movieCard = null;


  constructor (container, element, receivingDataTransmissionModel, parentElements, containerView, sortingView,) {
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
      remove (this.#sortingView);
      render(this.#messageView, this.#containerView.element, RenderPosition.AFTERBEGIN);
    } else {
      this.#transferData ();
    }
  }


  setChangeData (temporaryDatas) {
    this.#datas = temporaryDatas;
    this.#number = COUNTER;
    const childElements = document.querySelectorAll ('.film-card');
    for (const childElement of childElements) {
      this.#container.removeChild (childElement);
    }
    remove (this.#movieCard);
    this.#validationData ();
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
      this.#buttonView.setClickHandler (this.#renderMoreCards);
    }
  }


  #removeButton () {
    if (this.#number >= this.#datas.length) {
      remove (this.#buttonView);
    }
  }


  #closePopupKey = (evt) => {
    if(evt.key === 'Esc' || evt.key === 'Escape') {
      this.#closPopup();
      document.removeEventListener('keydown', this.#closePopupKey);
    }
  };


  #renderPopup = (data) => {
    document.addEventListener('keydown',this.#closePopupKey);
    this.#checkOpenPopups ();
    const popup = new PopupView (data);
    popup.setClickHandler (this.#closPopup);
    render(popup, this.#element, RenderPosition.AFTEREND);
    this.#parentElements.classList.add ('hide-overflow');
  };


  #renderMovieCardAndPopup (data) {
    this.#movieCard = new MovieCardView (data);
    this.#movieCard.setClickHandler (this.#renderPopup,data);
    render(this.#movieCard, this.#container);
  }


  #closPopup = () => {
    document.removeEventListener('keydown', this.#closePopupKey);
    const childElement = document.querySelector ('.film-details');
    this.#parentElements.removeChild (childElement);
    this.#parentElements.classList.remove ('hide-overflow');
  };


  #checkOpenPopups () {
    const childElement = document.querySelectorAll ('.film-details');
    if (childElement.length > 0) {this.#parentElements.removeChild (childElement[0]);}
  }

}
