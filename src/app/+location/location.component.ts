import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Enemy,
         Inventory,
         InventorySlot,
         Location,
         Player,
         Vessel } from '../shared/classes';

import { ItemService,
         LocationService,
         PlayerService } from '../shared/services';

interface EnemyEncounter {
  beingAttacked: boolean;
  isTakingDamage: boolean;
  character: Enemy;
  isDefeated: boolean;
}

@Component({
  selector: 'station-location',
  template: require('./location.component.html')
})
export class LocationComponent implements OnInit {
  public isAttacking: boolean = false;
  public location: Location;
  public enemyEncounters: EnemyEncounter[];
  public player: Player;
  public vessels: Vessel[];

  constructor(
    private itemService: ItemService,
    private locationService: LocationService,
    private playerService: PlayerService,
    private router: Router) { }

  public attack(status: EnemyEncounter): void {

    let enemy = status.character;
    let attackRoll = Math.floor(Math.random() * 100) + 1;

    if (this.getChanceToDefeat(enemy) >= attackRoll) {
      status.character.modifyHealth(-this.player.attack);
      status.isTakingDamage = true;
      if (status.character.health === 0) {
        status.isDefeated = true;
        this.enemyEncounters = this.enemyEncounters.filter(encounter => {
          return (encounter.isDefeated === false);
        });
        if (this.enemyEncounters.length === 0) {
          this.isAttacking = false;
        }
      }
    } else {
      status.isTakingDamage = false;
    }

    status.beingAttacked = true;
    setTimeout(() => {
      status.beingAttacked = false;
      status.isTakingDamage = false;
    }, 1000);
    this.player.modifyHealth(-enemy.attack);

    if (this.player.health === 0) {
      alert('You died.');
      this.reset();
      this.router.navigate(['/home']);
      return;
    }
  }

  public getChanceToDefeat(enemy: Enemy): number {
    let percent: number = 95;
    percent -= (100 - this.player.getHealthPercentage());

    if (this.player.defense < enemy.attack) {
      percent -= Math.floor(this.player.defense / enemy.attack * 100);
    }

    if (enemy.defense < this.player.attack) {
      percent += Math.floor(enemy.defense / this.player.attack * 100);
    }

    if (percent > 95) {
      percent = 95;
    }

    if (percent < 1) {
      percent = 1;
    }

    return percent;
  }

  public explore(): void {

    this.location.percentExplored += Math.floor(Math.random() * 8) + 1;

    if (this.location.percentExplored > 100) {
      this.location.percentExplored = 100;
    }

    this.getEncounters();
    this.getVessels();
  }

  public getEncounters(): void {
    let chanceOfAttack = Math.floor(Math.random() * 6) + 1;

    if (chanceOfAttack > 4) {

      let numEnemies = Math.floor(Math.random() * 3) + 1;

      this.isAttacking = true;
      this.enemyEncounters = [];

      while (numEnemies > 0) {
        let index = Math.floor(Math.random() * this.location.enemies.length);
        let enemy = new Enemy(this.location.enemies[index]);
        this.enemyEncounters.push({
          character: enemy,
          beingAttacked: false,
          isDefeated: false,
          isTakingDamage: false
        });
        --numEnemies;
      }
    }
  }

  public getVessels(): void {
    this.vessels = [
      new Vessel({
        name: 'Desk',
        inventory: new Inventory([
          new InventorySlot<any>({
            itemId: 1,
            quantity: 5
          }),
          new InventorySlot<any>({
            itemId: 2,
            quantity: 3
          })
        ])
      })
    ];
  }

  public toggleVessel(vessel: Vessel):void {
    vessel.isOpen = !vessel.isOpen;
  }

  public quit(): void {
    this.reset();
    this.router.navigate(['/home']);
  }

  private reset(): void {
    this.player.health = this.player.healthMax;
    this.location.percentExplored = 0;
  }

  public ngOnInit(): void {

    // this.route.params.forEach((params: Params) => {
    //   let id: string = params['id'];
    //   this.locationService.getById(id).then(data => {
    //     this.location = data;
    //   });
    // });

    this.locationService.getById(1).then(data => {
      this.location = data;
    });

    this.playerService.getPlayer().then(data => {
      this.player = data;
    });

    // this.vesselService.getVessel().then(data => {
    //
    // });
  }
}
