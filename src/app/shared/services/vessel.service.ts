import { Injectable } from '@angular/core';
import { Vessel, Inventory, InventorySlot } from '../classes';
import { ItemService } from './index';

@Injectable()
export class VesselService {
  private vessels: Vessel[] = [
    new Vessel({
      inventory: new Inventory([
        new InventorySlot<any>({
          itemId: 1,
          quantity: 15
        }),
        new InventorySlot<any>({
          itemId: 2,
          quantity: 3
        })
      ]),
      name: 'Desk'
    })
  ];

  constructor(
    private itemService: ItemService) { }

  public getVessel(): Promise<any> {
    return this.itemService.populate(this.vessels[0].inventory).then(() => {
      return Promise.resolve(this.vessels[0]);
    });
  }
}
