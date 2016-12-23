import { Inventory } from './index';

interface RoverOptions {
  id: Number;
  name: String;
  level: Number;
  inventory?: Inventory
}

export class Rover {
  public id: Number;
  public name: String;
  public level: Number = 1;
  public inventory: Inventory;

  constructor(options: RoverOptions) {
    for (let k in options) {
      if (options.hasOwnProperty(k)) {
        this[k] = options[k];
      }
    }
  }
}
