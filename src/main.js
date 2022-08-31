import UserNameView from './view/user-name-view.js';
import NavigationMenuView from './view/navigation-menu-view.js';
import SortingView from './view/sorting-view.js';
import ContainerView from './view/container-view.js';
import NumberOfFilmsView from './view/number-of-films-view.js';
import MovieCardsPresenter from './presenter/movie-cards-presenter.js';
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
const sortingView = new SortingView;
const filter = getValuesToFilters (moviesModel.movies);
const navigationMenuView = new NavigationMenuView (filter);
const filterModel = new FilterModel (moviesModel);


render(new UserNameView(), headerElement);
render(navigationMenuView, mainElement);
render(sortingView, mainElement);
render(containerView, mainElement);
render(new NumberOfFilmsView(), footerElement);

const container = document.querySelector('.films-list__container');
const parentElements = document.querySelector ('body');

const movieCardsPresenter = new MovieCardsPresenter(container, element, moviesModel, parentElements, containerView, sortingView);
movieCardsPresenter.init();
const filterPresenter = new FilterPresenter (navigationMenuView, filterModel, movieCardsPresenter, moviesModel);
filterPresenter.init();
