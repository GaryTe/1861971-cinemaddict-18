import { values } from '../data';

export default class FilterModel {
  #temporaryDatas = values;
  values = [];


  setSortDataByKey (key) {
    this.values = [];
    for (const temporaryValues of this.#temporaryDatas) {
      const {userDetails} = temporaryValues;
      if (userDetails.favorite === true) {
        this.values.push (temporaryValues);
      }
    }
    return this.values;
  }
}
