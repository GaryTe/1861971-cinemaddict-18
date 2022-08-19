import { getData } from '../fishData/data.js';

export default class ReceivingDataTransmissionModel {
  #data = Array.from ({length:5},getData);

  get tasks () {return this.#data;}
}
