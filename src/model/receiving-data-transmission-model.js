import { getData } from '../fishData/data.js';

export default class ReceivingDataTransmissionModel {
  #data = Array.from ({length:20},getData);

  get tasks () {return this.#data;}
}
