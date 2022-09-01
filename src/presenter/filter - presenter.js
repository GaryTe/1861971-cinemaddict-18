export default class FilterPresenter {
  #navigationMenuView = null;
  #filterModel = null;
  #masterPresenter = null;
  #receivingDataTransmissionModel = null;

  constructor (navigationMenuView, filterModel, masterPresenter, receivingDataTransmissionModel) {
    this.#navigationMenuView = navigationMenuView;
    this.#filterModel = filterModel;
    this.#masterPresenter = masterPresenter;
    this.#receivingDataTransmissionModel = receivingDataTransmissionModel;
  }


  init () {
    this.#transferFunction ();
  }


  #callFilterModel = (filterName) => {
    if (filterName === 'all') {
      const movies = this.#receivingDataTransmissionModel.movies;
      this.#masterPresenter.setChangeData (movies);
    } else {
      const sortMovies = this.#filterModel.setSortDataByKey (filterName);
      this.#masterPresenter.setChangeData (sortMovies);
    }
  };

  #transferFunction () {
    this.#navigationMenuView.setClickHandler (this.#callFilterModel);
  }
}
