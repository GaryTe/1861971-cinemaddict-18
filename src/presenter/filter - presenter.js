export default class FilterPresenter {
  #navigationMenuView = null;
  #filterModel = null;
  #movieCardPopupPresenter = null;
  #receivingDataTransmissionModel = null;

  constructor (navigationMenuView, filterModel, movieCardPopupPresenter, receivingDataTransmissionModel) {
    this.#navigationMenuView = navigationMenuView;
    this.#filterModel = filterModel;
    this.#movieCardPopupPresenter = movieCardPopupPresenter;
    this.#receivingDataTransmissionModel = receivingDataTransmissionModel;
  }


  init () {
    this.#transferFunction ();
  }


  #callFilterModel = (key) => {
    if (key === 'all') {
      const fishDatas = this.#receivingDataTransmissionModel.tasks;
      this.#movieCardPopupPresenter.setChangeData (fishDatas);
    } else {
      const temporaryDatas = this.#filterModel.setSortDataByKey (key);
      this.#movieCardPopupPresenter.setChangeData (temporaryDatas);
    }
  };

  #transferFunction () {
    this.#navigationMenuView.setClickHandler (this.#callFilterModel);
  }
}
