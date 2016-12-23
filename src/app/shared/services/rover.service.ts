import { Injectable } from '@angular/core';

import { Inventory, InventorySlot, Rover } from '../classes';
import { ItemService } from './index';

@Injectable()
export class RoverService {
  private rovers: Rover[] = [
    new Rover({
      id: 1,
      name: "Trinity",
      level: 24,
      inventory: new Inventory([
        new InventorySlot<any>({
          itemId: 1,
          quantity: 15
        }),
        new InventorySlot<any>({
          itemId: 2,
          quantity: 65
        }),
        new InventorySlot<any>({
          itemId: 4,
          quantity: 3
        })
      ])
    }),
    new Rover({
      id: 2,
      name: "Halberd",
      level: 12,
      inventory: new Inventory([
        new InventorySlot<any>({
          itemId: 1,
          quantity: 15
        }),
        new InventorySlot<any>({
          itemId: 2,
          quantity: 65
        }),
        new InventorySlot<any>({
          itemId: 4,
          quantity: 3
        })
      ])
    }),
    new Rover({
      id: 3,
      name: "Big Bertha",
      level: 1,
      inventory: new Inventory([
        new InventorySlot<any>({
          itemId: 1,
          quantity: 15
        }),
        new InventorySlot<any>({
          itemId: 2,
          quantity: 65
        }),
        new InventorySlot<any>({
          itemId: 4,
          quantity: 3
        })
      ])
    }),
    new Rover({
      id: 4,
      name: "Lexor",
      level: 1,
      inventory: new Inventory([
        new InventorySlot<any>({
          itemId: 1,
          quantity: 15
        }),
        new InventorySlot<any>({
          itemId: 2,
          quantity: 65
        }),
        new InventorySlot<any>({
          itemId: 4,
          quantity: 3
        })
      ])
    })
  ];
  private activeRover: Rover;

  constructor(private itemService: ItemService) { }

  public getActiveRover(): Promise<Rover> {
    if (!this.activeRover) {
      return Promise.resolve(null);
    }
    return this.itemService.populate(this.activeRover.inventory).then(() => {
      return this.activeRover;
    });
  }

  public setActiveRover(rover: Rover): void {
    this.activeRover = rover;
  }

  public getAll(): Promise<Rover[]> {
    return Promise.resolve(this.rovers);
  }
}
