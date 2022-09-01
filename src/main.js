import UserNameView from './view/user-name-view.js';
import NavigationMenuView from './view/navigation-menu-view.js';
import ContainerView from './view/container-view.js';
import NumberOfFilmsView from './view/number-of-films-view.js';
import MasterPresenter from './presenter/master-presenter.js';
import MoviesModel from './model/movies-model';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter - presenter.js';
import {getValuesToFilters} from './filter.js';
import {render} from './framework/render.js';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer__statistics');
const element = document.querySelector('footer');


const moviesModel = new MoviesModel();
const containerView = new ContainerView;
const filter = getValuesToFilters (moviesModel.movies);
const navigationMenuView = new NavigationMenuView (filter);
const filterModel = new FilterModel (moviesModel);


render(new UserNameView(), headerElement);
render(navigationMenuView, mainElement);
render(containerView, mainElement);
render(new NumberOfFilmsView(), footerElement);

const container = document.querySelector('.films-list__container');
const parentElements = document.querySelector ('body');

const masterPresenter = new MasterPresenter(container, element, moviesModel, parentElements, containerView, navigationMenuView);
masterPresenter.init();
const filterPresenter = new FilterPresenter (navigationMenuView, filterModel, masterPresenter, moviesModel);
filterPresenter.init();
