import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

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
  attackTimer: number;
  attackTimerCountdown?: number;
  attackTimerSubscription?: Subscription;
  attackTimerPercentage?: number;
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
  private mouseDownSubscription: Subscription;
  private replenishEnergySubscription: Subscription;
  public isMouseDown: boolean = false;
  public isKeyDown: boolean = false;

  constructor(
    private itemService: ItemService,
    private locationService: LocationService,
    private playerService: PlayerService,
    private router: Router) { }

  public attack(status: EnemyEncounter): void {

    let enemy = status.character;
    let attackRoll = Math.floor(Math.random() * 100) + 1;

    this.player.modifyEnergy(-Math.floor(this.player.energy * .2));

    if (this.player.energy > 0 && this.getChanceToDefeat(enemy) >= attackRoll) {
      status.character.modifyHealth(-this.player.attack);
      status.isTakingDamage = true;
      if (status.character.health === 0) {
        status.isDefeated = true;
        status.attackTimerSubscription.unsubscribe();
        this.enemyEncounters = this.enemyEncounters.filter(encounter => {
          return (encounter.isDefeated === false);
        });
        if (this.enemyEncounters.length === 0) {
          this.isAttacking = false;
        }
      }
    } else {
      this.player.modifyHealth(-enemy.attack);
      status.isTakingDamage = false;
    }

    status.beingAttacked = true;
    setTimeout(() => {
      status.beingAttacked = false;
      status.isTakingDamage = false;
    }, 1000);

    if (this.checkDeath() === true) {
      return;
    }

    this.mouseUp();
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

    return Math.floor(percent);
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

    if (chanceOfAttack > 2) {

      let numEnemies = Math.floor(Math.random() * 3) + 2;

      this.isAttacking = true;
      this.enemyEncounters = [];

      while (numEnemies > 0) {
        let index = Math.floor(Math.random() * this.location.enemies.length);
        let enemy = new Enemy(this.location.enemies[index]);

        this.enemyEncounters.push({
          attackTimer: Math.floor(Math.random() * 150) + 50,
          character: enemy,
          beingAttacked: false,
          isDefeated: false,
          isTakingDamage: false
        });

        let encounter = this.enemyEncounters[this.enemyEncounters.length - 1];
        encounter.attackTimerSubscription = this.getEncounterSubscription(encounter);

        --numEnemies;

      }
    }
  }

  private checkDeath(): boolean {
    if (this.player.health === 0) {
      this.unsubscribe();
      alert('You died.');
      this.reset();
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  private getEncounterSubscription(encounter: EnemyEncounter): Subscription {
    encounter.attackTimerCountdown = encounter.attackTimer;
    let startup = Math.floor(Math.random() * 5000) + 1500;
    return Observable.timer(startup, 15).subscribe(() => {
      encounter.attackTimerCountdown--;
      encounter.attackTimerPercentage = Math.floor(encounter.attackTimerCountdown / encounter.attackTimer * 100);
      if (encounter.attackTimerCountdown <= 0) {
        encounter.attackTimerPercentage = 0;
        encounter.attackTimerCountdown = 0;
        encounter.attackTimerSubscription.unsubscribe();
        if (!this.isMouseDown) {
          this.player.modifyHealth(-encounter.character.attack);
          if (this.checkDeath()) {
            encounter.attackTimerSubscription.unsubscribe();
            return;
          }
        } else {
          this.player.modifyEnergy(-encounter.character.attack);
        }
        encounter.attackTimerSubscription = this.getEncounterSubscription(encounter);
      }
    });
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


  @HostListener('document:keypress', ['$event'])
  public onKeyPress(event: KeyboardEvent):void {
    event.preventDefault();
    if (!this.isKeyDown) {
      this.isKeyDown = true;
      if (event.which === 32) {
        console.log("Keydown:", event.which);
        this.mouseDown();
      }
    }
  }

  @HostListener('document:keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent):void {
    this.isKeyDown = false;
    if (event.which === 32) {
      this.mouseUp();
    }
  }

  public mouseDown(): void {
    if (this.player.energy === 0) {
      this.mouseUp();
      return;
    }
    this.isMouseDown = true;
    this.unsubscribe();
    this.mouseDownSubscription = Observable.interval(30).subscribe(() => {
      this.player.modifyEnergy(-.1);
      if (this.player.energy === 0) {
        this.mouseUp();
      }
    });
  }

  public mouseMove(event: MouseEvent): void {
    if (this.isMouseDown === true) {
      var x = event.clientX;     // Get the horizontal coordinate
      var y = event.clientY;     // Get the vertical coordinate
      var coor = "X coords: " + x + ", Y coords: " + y;
      console.log(coor);
    }
  }

  public mouseLeave(): void {
    this.mouseUp();
  }

  private unsubscribe(): void {
    if (this.mouseDownSubscription) {
      this.mouseDownSubscription.unsubscribe();
    }
    if (this.replenishEnergySubscription) {
      this.replenishEnergySubscription.unsubscribe();
    }
  }

  public mouseUp(): void {
    this.isMouseDown = false;
    this.unsubscribe();
    this.replenishEnergySubscription = Observable.timer(1500, 20).subscribe(() => {
      this.player.modifyEnergy(.15);
    });
  }

  public quit(): void {
    this.reset();
    this.router.navigate(['/home']);
  }

  private reset(): void {
    this.player.health = this.player.healthMax;
    this.location.percentExplored = 0;
    this.enemyEncounters.forEach((encounter) => {
      encounter.attackTimerSubscription.unsubscribe();
    });
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
