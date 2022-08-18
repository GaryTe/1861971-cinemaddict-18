import { getData } from '../fishData/data.js';

export default class ReceivingDataTransmissionModel {
  data = Array.from ({length:5},getData);

  getTasks () {return this.data;}
}
