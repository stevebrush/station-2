import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BattleService } from '../../shared/services';

class Combo {
  constructor(private actions: any[]) {

  }
}

@Component({
  template: require('./location-main-menu.component.html')
})
export class LocationMainMenuComponent implements OnInit {
  private selectedEnemy: any;
  enemies: any[] = [
    {
      name: "Prism Knight",
      combos: [
        new Combo([
          {
            name: "Wait"
          },
          {
            name: "Attack"
          },
          {
            name: "Wait"
          },
          {
            name: "Wait"
          },
          {
            name: "Wait"
          }
        ]),
        new Combo([
          {
            name: "Attack"
          },
          {
            name: "Attack"
          },
          {
            name: "Wait"
          },
          {
            name: "Block"
          },
          {
            name: "Wait"
          }
        ])
      ],
    },
    {
      name: "Rabbid Dog"
    }
  ];

  constructor(
    private router: Router,
    private battleService: BattleService) { }

  engage(enemy: any): void {
    this.selectedEnemy = enemy;
    this.router.navigate(['location/enemy']);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.battleService.setActiveEnemy(this.selectedEnemy);
  }
}
