import { Component, OnInit } from '@angular/core';

@Component({
  template: require('./depot.component.html')
})
export class DepotComponent implements OnInit {
  inventory: any[] = [
    {
      item: {
        name: "Iodyte"
      },
      category: "Resource",
      quantity: 142
    },
    {
      item: {
        name: "Nitrium"
      },
      category: "Resource",
      quantity: 2352
    },
    {
      item: {
        name: "Salt"
      },
      category: "Resource",
      quantity: 29
    },
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
