import ContainerView from './view/container-view.js';
import MasterPresenter from './presenter/master-presenter.js';
import FilterPresenter from './presenter/filter - presenter.js';
import MoviesModel from './model/movies-model';
import FilterModel from './model/filter-model.js';
import CommentsModel from './model/comments-model.js';
import {render} from './framework/render.js';
import ApiMovieService from './api-srvice/api-movie-service.js';
import ApiCommentsService from './api-srvice/api-comments-service.js';

const AUTHORIZATION = 'Basic Vlad84';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict/';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const sectionElement = document.querySelector('.footer__statistics');
const footerElement = document.querySelector('footer');


const moviesModel = new MoviesModel(new ApiMovieService (END_POINT, AUTHORIZATION));
const containerView = new ContainerView;
const filterModel = new FilterModel (moviesModel);
const commentsModel = new CommentsModel (new ApiCommentsService (END_POINT, AUTHORIZATION));

render(containerView, mainElement);

const container = document.querySelector('.films-list__container');
const bodyElement = document.querySelector ('body');


const filterPresenter = new FilterPresenter (filterModel, moviesModel, mainElement, headerElement);
filterPresenter.init ();


const masterPresenter = new MasterPresenter (container, footerElement, moviesModel, bodyElement,
  containerView, filterModel, sectionElement, commentsModel);
masterPresenter.init ();


moviesModel.init ();
