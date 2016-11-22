import { ItemOptions } from '../interfaces';

export abstract class Item {
  public id: number;
  public isConsumable: boolean = false;
  public name: string;

  constructor(options: ItemOptions) {
    for (let k in options) {
      if (options.hasOwnProperty(k)) {
        this[k] = options[k];
      }
    }
  }
}
