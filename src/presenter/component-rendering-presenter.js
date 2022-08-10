import MovieCardView from '../view/movie-card-view.js';
import ButtonView from '../view/button-view.js';
import {RenderPosition, render} from '../render.js';

export default class ComponentRenderingPresenter {

  init = (container) => {
    this.container = container;

    //render(this.container, this.mainElement);
    //render(new SortView(), this.boardComponent.getElement());
    //render(this.taskListComponent, this.boardComponent.getElement());
    //render(new TaskEditView(), this.taskListComponent.getElement());

    for (let i = 0; i < 5; i++) {
      render(new MovieCardView(), this.container);
    }

    render(new ButtonView(), this.container, RenderPosition.AFTEREND);

    //render(new LoadMoreButtonView(), this.boardComponent.getElement());
  };
}
