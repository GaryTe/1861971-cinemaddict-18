import UserNameView from './view/user-name-view.js';
import ContainerView from './view/container-view.js';
import NumberOfFilmsView from './view/number-of-films-view.js';
import MasterPresenter from './presenter/master-presenter.js';
import FilterPresenter from './presenter/filter - presenter.js';
import MoviesModel from './model/movies-model';
import FilterModel from './model/filter-model.js';
import {render} from './framework/render.js';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const sectionElement = document.querySelector('.footer__statistics');
const footerElement = document.querySelector('footer');


const moviesModel = new MoviesModel();
const containerView = new ContainerView;
const filterModel = new FilterModel (moviesModel);


render(new UserNameView(), headerElement);
render(containerView, mainElement);
render(new NumberOfFilmsView(), sectionElement);

const container = document.querySelector('.films-list__container');
const bodyElement = document.querySelector ('body');


const filterPresenter = new FilterPresenter (filterModel, moviesModel, mainElement);
filterPresenter.init ();


const masterPresenter = new MasterPresenter (container, footerElement, moviesModel, bodyElement,
  containerView, filterModel);
masterPresenter.init ();
