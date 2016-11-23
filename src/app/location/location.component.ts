import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Enemy,
         Location,
         Player,
         Character,
         Item,
         Inventory,
         InventorySlot } from '../shared/classes';
import { ItemService,
         LocationService,
         PlayerService } from '../shared/services';

@Component({
  selector: 'station-location',
  template: require('./location.component.html')
})
export class LocationComponent implements OnInit {
  public isAttacking: boolean = false;
  public location: Location;
  public enemies: Enemy[];
  public player: Player;
  private attackStatuses: any[] = [];

  constructor(
    private itemService: ItemService,
    private locationService: LocationService,
    private playerService: PlayerService,
    private router: Router) {}

  private setAttackStatus(enemy: Enemy, status: boolean): void {
    this.attackStatuses.forEach(attackStatus => {
      attackStatus.isSuccess = false;
      attackStatus.isActive = false;
      if (attackStatus.id === enemy.id) {
        attackStatus.isActive = true;
        attackStatus.isSuccess = status;
      }
    });
  }

  public attack(enemy: Enemy): void {
    let attackRoll = Math.floor(Math.random() * 100) + 1;
    if (this.getChanceToDefeat(enemy) >= attackRoll) {
      this.setAttackStatus(enemy, true);

      //enemy.health -= this.player.attack;

      //if (enemy.health <= 0) {
        this.enemies = this.enemies.filter(e => {
          return e.id !== enemy.id;
        });
        this.location.enemies = this.location.enemies.filter(e => {
          return e.id !== enemy.id;
        });
        if (this.enemies.length === 0) {
          this.isAttacking = false;
        }
      //}

    } else {
      this.setAttackStatus(enemy, false);
    }

    this.player.modifyHealth(-enemy.attack);

    if (this.player.health === 0) {
      alert('You died.');
      this.router.navigate(['/home']);
      return;
    }

    window.setTimeout(() => {
      this.attackStatuses.forEach(attackStatus => {
        attackStatus.isActive = false;
        attackStatus.isSuccess = false;
      })
    }, 1000);
  }

  public isActive(enemy: Enemy): boolean {
    for (let i = 0, len = this.attackStatuses.length; i < len; ++i) {
      if (this.attackStatuses[i].id === enemy.id) {
        return (this.attackStatuses[i].isActive);
      }
    }
    return false;
  }

  public getAttackStatus(enemy: Enemy): boolean {
    for (let i = 0, len = this.attackStatuses.length; i < len; ++i) {
      if (this.attackStatuses[i].id === enemy.id) {
        return (this.attackStatuses[i].isSuccess);
      }
    }
    return false;
  }

  public getChanceToDefeat(enemy: Enemy): number {
    let percent: number = 95;
    percent -= 100 - this.player.getHealthPercentage();
    if (this.player.defense < enemy.attack) {
      percent -= 30;
    }
    if (enemy.defense < this.player.attack) {
      percent += 10;
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
    this.location.percentExplored += 10;

    if (this.location.percentExplored > 100) {
      this.location.percentExplored = 100;
    }

    let chanceOfAttack = Math.floor(Math.random() * 6) + 1;

    if (this.location.enemies.length > 0 && chanceOfAttack > 3) {

      let numEnemies = Math.floor(Math.random() * this.location.enemies.length) + 1;
      if (numEnemies > 2) {
        numEnemies = 2;
      }
      this.isAttacking = true;
      this.enemies = [];

      while (numEnemies > 0) {
        let index = Math.floor(Math.random() * this.location.enemies.length);
        let enemy = this.location.enemies[index];
        this.enemies.push(enemy);
        this.location.enemies.splice(index, 1);
        --numEnemies;
      }
    }
  }

  public use(slot: InventorySlot<any>): void {
    slot.item.actOn(this.player);
    slot.modifyQuantity(-1);
    this.player.inventory.clean();
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
      this.location.enemies.forEach(enemy => {
        this.attackStatuses.push({
          id: enemy.id,
          isActive: false,
          isSuccess: false
        });
      });
    });
    this.playerService.getPlayer().then(data => {
      this.player = data;
    });
  }
}
