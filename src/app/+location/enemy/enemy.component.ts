import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BattleService, RoverService } from '../../shared/services';

@Component({
  template: require('./enemy.component.html')
})
export class EnemyComponent implements OnInit {
  enemy: any;
  rover: any;
  actions: any[] = [
    {
      name: "Attack"
    },
    {
      name: "Block"
    },
    {
      name: "Evade"
    },
    {
      name: "Wait"
    },
    {
      name: "Use Item..."
    }
  ];

  constructor(
    private router: Router,
    private battleService: BattleService,
    private roverService: RoverService) { }

  do(action: any): void {
    console.log("DO:", action);
  }

  ngOnInit(): void {
    this.battleService.getActiveEnemy().then((enemy) => {
      if (!enemy) {
        this.router.navigate(['home']);
        return;
      }
      this.enemy = enemy;
    });
    this.roverService.getActiveRover().then((rover) => {
      if (!rover) {
        this.router.navigate(['home']);
        return;
      }
      this.rover = rover;
    });
  }
}
