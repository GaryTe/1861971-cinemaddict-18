import { getData } from '../data';

export default class ReceivingDataTransmissionModel {
  #data = Array.from ({length:13},getData);

  get tasks () {return this.#data;}
}
