import MovieCardView from '../view/movie-card-view.js';
import ButtonView from '../view/button-view.js';
import {RenderPosition, render} from '../render.js';

export default class ComponentRenderingPresenter {

  init = (container) => {
    this.container = container;

    for (let i = 0; i < 5; i++) {
      render(new MovieCardView(), this.container);
    }

    render(new ButtonView(), this.container, RenderPosition.AFTEREND);
  };
}
