import {FilterType, UpdateType} from '../const.js';
import {getValuesToFilters} from '../filter.js';
import {remove, replace, render, RenderPosition} from '../framework/render.js';
import NavigationMenuView from '../view/navigation-menu-view.js';
import UserNameView from '../view/user-name-view.js';


export default class FilterPresenter {
  #filterModel = null;
  #moviesModel = null;
  #mainElement = null;
  #navigationMenuView = null;
  #userNameView = null;
  #headerElement = null;

  constructor (filterModel, moviesModel, mainElement, headerElement) {
    this.#filterModel = filterModel;
    this.#moviesModel = moviesModel;
    this.#mainElement = mainElement;
    this.#headerElement = headerElement;

    this.#moviesModel.addObserver (this.#handleModelEvent);
    this.#filterModel.addObserver (this.#handleModelEvent);
  }


  get filters() {
    const movies = this.#moviesModel.movies;

    return [
      {
        type: FilterType.ALL,
      },
      {
        type: FilterType.WATCHLIST,
        count: getValuesToFilters(FilterType.WATCHLIST, movies).length,
      },
      {
        type: FilterType.ALREADY_WATCHED,
        count: getValuesToFilters(FilterType.ALREADY_WATCHED, movies).length,
      },
      {
        type: FilterType.FAVORITE,
        count: getValuesToFilters(FilterType.FAVORITE, movies).length,
      }
    ];
  }


  init () {
    const filters = this.filters;
    const prevNavigationMenuView = this.#navigationMenuView;
    const prevUserNameView = this.#userNameView;

    this.#navigationMenuView = new NavigationMenuView (filters, this.#filterModel.filter);
    this.#navigationMenuView.setClickHandler(this.#handleFilterTypeChange);

    this.#userNameView = new UserNameView (filters[2].count);

    if (prevNavigationMenuView === null) {
      render(this.#navigationMenuView, this.#mainElement, RenderPosition.AFTERBEGIN);
      render(this.#userNameView, this.#headerElement);
      return;
    }

    replace(this.#userNameView, prevUserNameView);
    remove(prevUserNameView);
    replace(this.#navigationMenuView, prevNavigationMenuView);
    remove(prevNavigationMenuView);
  }


  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
