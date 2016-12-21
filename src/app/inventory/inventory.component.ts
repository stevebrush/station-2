import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character, Inventory, InventorySlot } from '../shared/classes';

@Component({
  selector: 'station-inventory',
  template: require('./inventory.component.html')
})
export class InventoryComponent implements OnInit{

  @Input()
  owner: Character;

  @Input()
  inventory: Inventory;

  @Input()
  isOpen: boolean;

  @Output()
  onClosed: EventEmitter<any> = new EventEmitter();

  public close(): void {
    this.isOpen = false;
    this.onClosed.emit(false);
  }

  public take(): void {

  }

  public use(slot: InventorySlot<any>): void {
    slot.item.actOn(this.owner);
    slot.modifyQuantity(-1);
    this.inventory.clean();
  }

  public ngOnInit(): void {
    this.isOpen = false;
  }
}
