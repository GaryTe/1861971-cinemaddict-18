import UserNameView from './view/user-name-view.js';
import NavigationMenuView from './view/navigation-menu-view.js';
import SortingView from './view/sorting-view.js';
import ContainerView from './view/container-view.js';
import NumberOfFilmsView from './view/number-of-films-view.js';
import ComponentRenderingPresenter from './presenter/component-rendering-presenter.js';
import ReceivingDataTransmissionModel from './model/receiving-data-transmission.js';
import {render} from './render.js';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer__statistics');
const element = document.querySelector('footer');

const componentRenderingPresenter = new ComponentRenderingPresenter();
const receivingDataTransmissionModel = new ReceivingDataTransmissionModel();

render(new UserNameView(), headerElement);
render(new NavigationMenuView(), mainElement);
render(new SortingView(), mainElement);
render(new ContainerView(), mainElement);
render(new NumberOfFilmsView(), footerElement);

const container = document.querySelector('.films-list__container');
const parentElements = document.querySelector ('body');
componentRenderingPresenter.init(container, element, receivingDataTransmissionModel, parentElements);
