export default class SortPresenter {
  #sortingView = null;
  #sortModel = null;
  #masterPresenter = null;

  constructor (sortingView, sortModel, masterPresenter) {
    this.#sortingView = sortingView;
    this.#sortModel = sortModel;
    this.#masterPresenter = masterPresenter;
  }

  init () {
    this.#transferCallSortByDefault ();
  }


  #callSortByDefault = (sortName) => {
    const sortMovies = this.#sortModel.setSortByDefault (sortName);
    this.#masterPresenter.setChangeData (sortMovies);
  };


  #transferCallSortByDefault () {
    this.#sortingView.setClickHandler (this.#callSortByDefault);
  }
}
