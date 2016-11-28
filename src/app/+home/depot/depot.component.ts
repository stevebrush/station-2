import { Component, OnInit } from '@angular/core';

@Component({
  template: require('./depot.component.html')
})
export class DepotComponent implements OnInit {
  quarries: any[] = [
    {
      name: "The Wastes",
      iodyte: 98740,
      nitrium: 0,
      salt: 0,
      drones: 1
    },
    {
      name: "Red Canyon",
      iodyte: 11500,
      nitrium: 500,
      salt: 0,
      drones: 1
    }
  ];
  inventory: any[] = [
    {
      item: {
        name: "Strange fabric"
      },
      category: "Misc",
      quantity: 1
    },
    {
      item: {
        name: "8mm round"
      },
      category: "Ammo",
      quantity: 9
    },
    {
      item: {
        name: "Repair Kit"
      },
      category: "Aid",
      quantity: 1
    }
  ];
  
  public ngOnInit(): void { }
}
