import { InventorySlot } from './index';

export class Inventory {
  public slots: InventorySlot<any>[];

  constructor(slots: InventorySlot<any>[] = []) {
    this.slots = slots;
  }

  public clean(): void {
    this.slots = this.slots.filter((slot) => {
      return (slot.quantity > 0);
    });
  }
}
