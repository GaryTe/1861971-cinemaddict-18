import MovieCardView from '../view/movie-card-view.js';
import ButtonView from '../view/button-view.js';
import PopupView from '../view/popup-view.js';
import {RenderPosition, render} from '../render.js';

export default class ComponentRenderingPresenter {

  init = (container, element, receivingDataTransmissionModel) => {
    this.container = container;
    this.element = element;
    this.receivingDataTransmissionModel = receivingDataTransmissionModel;
    this.datas = this.receivingDataTransmissionModel.getTasks();

    for (let i = 0; i < this.datas.length; i++) {
      render(new MovieCardView(this.datas[i]), this.container);
    }

    render(new ButtonView(), this.container, RenderPosition.AFTEREND);
    render(new PopupView(this.datas[0]), element, RenderPosition.AFTEREND);
  };
}
