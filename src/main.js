import UserNameView from './view/user-name-view.js';
import NavigationMenuView from './view/navigation-menu-view.js';
import SortingView from './view/sorting-view.js';
import ContainerView from './view/container-view.js';
import NumberOfFilmsView from './view/number-of-films-view.js';
import MovieCardPopupPresenter from './presenter/movie-card-popup-presenter.js';
import ReceivingDataTransmissionModel from './model/receiving-data-transmission-model.js';
import {render} from './framework/render.js';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer__statistics');
const element = document.querySelector('footer');


const receivingDataTransmissionModel = new ReceivingDataTransmissionModel();
const containerView = new ContainerView;
const sortingView = new SortingView;

render(new UserNameView(), headerElement);
render(new NavigationMenuView(), mainElement);
render(sortingView, mainElement);
render(containerView, mainElement);
render(new NumberOfFilmsView(), footerElement);

const container = document.querySelector('.films-list__container');
const parentElements = document.querySelector ('body');

const movieCardPopupPresenter = new MovieCardPopupPresenter(container, element, receivingDataTransmissionModel, parentElements, containerView, sortingView);
movieCardPopupPresenter.init();
