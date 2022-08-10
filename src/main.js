import UserNameView from './view/user-name-view.js';
import NavigationMenuView from './view/navigation-menu-view.js';
import SortingView from './view/sorting-view.js';
import ContainerView from './view/container-view.js';
import NumberOfFilmsView from './view/number-of-films-view.js';
import PopupView from './view/popup-view.js';
import ComponentRenderingPresenter from './presenter/component-rendering-presenter.js';
import {RenderPosition,render} from './render.js';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer__statistics');
const element = document.querySelector('footer');
const componentRenderingPresenter = new ComponentRenderingPresenter();

render(new UserNameView(), headerElement);
render(new NavigationMenuView(), mainElement);
render(new SortingView(), mainElement);
render(new ContainerView(), mainElement);
render(new NumberOfFilmsView(), footerElement);
render(new PopupView(), element, RenderPosition.AFTEREND);

const container = document.querySelector('.films-list__container');
componentRenderingPresenter.init(container);
