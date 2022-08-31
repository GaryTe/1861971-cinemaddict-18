export default class FilterPresenter {
  #navigationMenuView = null;
  #filterModel = null;
  #movieCardsPresenter = null;
  #receivingDataTransmissionModel = null;

  constructor (navigationMenuView, filterModel, movieCardsPresenter, receivingDataTransmissionModel) {
    this.#navigationMenuView = navigationMenuView;
    this.#filterModel = filterModel;
    this.#movieCardsPresenter = movieCardsPresenter;
    this.#receivingDataTransmissionModel = receivingDataTransmissionModel;
  }


  init () {
    this.#transferFunction ();
  }


  #callFilterModel = (filterName) => {
    if (filterName === 'all') {
      const movies = this.#receivingDataTransmissionModel.movies;
      this.#movieCardsPresenter.setChangeData (movies);
    } else {
      const sortMovies = this.#filterModel.setSortDataByKey (filterName);
      this.#movieCardsPresenter.setChangeData (sortMovies);
    }
  };

  #transferFunction () {
    this.#navigationMenuView.setClickHandler (this.#callFilterModel);
  }
}
