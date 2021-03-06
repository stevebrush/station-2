import { Injectable } from '@angular/core';

import { Item,
         Currency,
         Inventory,
         Salve } from '../classes';

import { Crudable } from '../interfaces';

@Injectable()
export class ItemService implements Crudable {
  public items: Item[] = [
    new Currency({
      name: "Salt",
      id: 1
    }),
    new Currency({
      name: "Iodyte",
      id: 2
    }),
    new Currency({
      name: "Nitrium",
      id: 3
    }),
    new Salve({
      name: "Repair Kit",
      id: 4
    })
  ];

  constructor() { }

  public getById(id: number): Promise<any> {
    let items = this.items.filter((item) => {
      return (item.id === id);
    });
    return Promise.resolve(items[0]);
  }

  public populate(inventory: Inventory): Promise<any[]> {
    let those = inventory.slots.map(slot => {
      return this.getById(slot.itemId).then(data => {
        slot.item = data;
      });
    });
    return Promise.all(those);
  }
}
