import AbstractView from '../framework/view/abstract-view.js';

const createContainer = () => `<section class="films">
<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

  <div class="films-list__container">`;

export default class ContainerView extends AbstractView {

  get template() {
    return createContainer();
  }
}
