import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Enemy,
         Location,
         Player,
         Character,
         Item,
         Inventory,
         InventorySlot } from '../shared/classes';
import { ItemService } from '../shared/services';

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

  public getHealthPercentage(character: Character): number {
    return Math.floor((character.health / character.healthMax) * 100);
  }

  public heal(): void {
    if (this.player.healthKits > 0) {
      this.player.health += 10;
      this.player.healthKits -= 1;
      if (this.player.health > this.player.healthMax) {
        this.player.health = this.player.healthMax;
      }
    }
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

    this.player.health -= enemy.attack;

    if (this.player.health <= 0) {
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
    percent -= 100 - this.getHealthPercentage(this.player);
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
    if (slot.item.isUsable) {
      slot.item.actOn(this.player);
    }
    if (slot.item.isConsumable) {
      slot.modifyQuantity(-1);
      this.player.inventory.clean();
    }
    // if (slot.item.isEquippable) {
    //   this.player.equip(slot.item);
    // }
  }

  public ngOnInit(): void {

    this.location = <Location>{
      name: 'Lucky`s Garage',
      percentExplored: 0,
      enemies: [
        new Enemy({
          attack: 4,
          defense: 2,
          health: 5,
          healthMax: 5,
          id: 1,
          name: 'Ogre'
        }),
        new Enemy({
          attack: 1,
          defense: 1,
          health: 2,
          healthMax: 2,
          id: 2,
          name: 'Rat'
        }),
        new Enemy({
          attack: 7,
          defense: 10,
          health: 10,
          healthMax: 10,
          id: 3,
          name: 'Croag'
        })
      ]
    };

    this.player = new Player({
      attack: 2,
      defense: 2,
      health: 35,
      healthKits: 3,
      healthMax: 35,
      id: 0,
      inventory: new Inventory(<InventorySlot<any>[]>[{
        itemId: 1,
        quantity: 5
      }]),
      name: 'Blasko'
    });

    this.itemService.populate(this.player.inventory).then(data => {
      console.log("Done populating items.");
    });

    this.location.enemies.forEach(enemy => {
      this.attackStatuses.push({
        id: enemy.id,
        isActive: false,
        isSuccess: false
      });
    });
  }
}
