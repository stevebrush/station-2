import { Injectable } from '@angular/core';
import { Player, Inventory, InventorySlot } from '../classes';
import { ItemService } from './index';

@Injectable()
export class PlayerService {
  private player: Player = new Player({
    attack: 2,
    defense: 2,
    energy: 50,
    energyMax: 50,
    health: 35,
    healthMax: 35,
    id: 0,
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
    name: 'Rover Mark I'
  });

  constructor(
    private itemService: ItemService) { }

  public getPlayer(): Promise<any> {
    return this.itemService.populate(this.player.inventory).then(() => {
      return Promise.resolve(this.player);
    });
  }
}
