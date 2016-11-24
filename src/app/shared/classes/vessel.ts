import { Inventory } from './index';

interface VesselOptions {
  inventory?: Inventory;
  isOpen?: boolean;
  name: string;
}

export class Vessel {
  public inventory: Inventory = new Inventory();
  public isOpen: boolean = false;
  public name: string;

  constructor(options: VesselOptions) {
    for (let k in options) {
      if (options.hasOwnProperty(k)) {
        this[k] = options[k];
      }
    }
  }
}
