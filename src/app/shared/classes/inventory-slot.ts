import { Item } from './index';

interface InventorySlotOptions<T> {
  item?: T;
  itemId: number;
  quantity: number;
}

export class InventorySlot<T> {
  public item: T;
  public itemId: number;
  public quantity: number = 1;

  constructor(options: InventorySlotOptions<T>) {
    for (let k in options) {
      if (options.hasOwnProperty(k)) {
        this[k] = options[k];
      }
    }
  }

  public modifyQuantity(modifier: number) {
    this.quantity += modifier;
    if (this.quantity < 0) {
      this.quantity = 0;
    }
  }
}
