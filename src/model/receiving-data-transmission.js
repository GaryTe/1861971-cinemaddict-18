import { data } from '../fishData/data.js';

export default class ReceivingDataTransmissionModel {
  data = Array.from ({length:5},data);

  getTasks () {return this.data;}
}
