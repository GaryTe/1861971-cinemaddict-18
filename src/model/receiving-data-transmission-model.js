import { values } from '../data';

export default class ReceivingDataTransmissionModel {
  #data = values;

  get tasks () {return this.#data;}
}
