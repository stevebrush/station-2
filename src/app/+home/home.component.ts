import { Component, OnInit } from '@angular/core';

class Character {
  baseAttack: number = 3;
  baseDefense: number = 2;
  name: string;
  combos: any[];
  health: number = 10;
  healthMax: number = 10;
  stamina: number = 10;
  staminaMax: number = 10;

  constructor(options: any) {
    Object.assign(this, options);
  }

  getAttackValue(): number {
    return this.baseAttack;
  }

  getDefenseValue(): number {
    return this.baseDefense;
  }

  getHealthPercentage(): number {
    return this.health / this.healthMax * 100;
  }

  getStaminaValue(): number {
    return this.stamina;
  }

  getStaminaPercentage(): number {
    return this.stamina / this.staminaMax * 100;
  }

  modifyHealth(modifier: number): void {
    this.health += modifier;
    if (this.health > this.healthMax) {
      this.health = this.healthMax;
    }
    if (this.health < 0) {
      this.health = 0;
    }
    console.log(this.health);
  }

  modifyStamina(modifier: number): void {
    this.stamina += modifier;
    if (this.stamina > this.staminaMax) {
      this.stamina = this.staminaMax;
    }
    if (this.stamina < 0) {
      this.stamina = 0;
    }
  }
}

class Encounter {
  playerAction: any;
  isActive: boolean = false;
  isRevealed: boolean = false;
  constructor(public enemyAction: any) {}
}

class Battle {
  combo: any = {};
  encounters: any[] = [];

  constructor(public enemy: Character, public player: Character) {
    this.setCombo();
    this.setupEncounter();
  }

  applyPlayerAction(action: any): void {
    let nextIndex = 0;
    let currentEncounter: any = {};

    if (this.player.stamina === 0 && action.staminaCost > 0) {
      return;
    }

    this.encounters.forEach((encounter: Encounter, i: number) => {
      if (encounter.isActive === true) {
        currentEncounter = encounter;
        encounter.playerAction = action;
        nextIndex = i + 1;
      }
      encounter.isActive = false;
    });

    if (nextIndex < this.encounters.length) {
      this.encounters[nextIndex].isRevealed = true;
      this.encounters[nextIndex].isActive = true;
    }

    this.enemy.modifyStamina(-1 * currentEncounter.enemyAction.staminaCost);
    this.player.modifyStamina(-1 * action.staminaCost);

    switch (currentEncounter.enemyAction.name) {
      case 'Attack':
        let damage = this.enemy.getAttackValue() - this.player.getDefenseValue();
        if (damage < 0) {
          damage = 1;
        }
        if (currentEncounter.playerAction.name === 'Block') {
          this.player.modifyStamina(-1 * damage);
        } else if (currentEncounter.playerAction.name === 'Dodge') {
          if ((Math.floor(Math.random() * 100) + 1) > 65) {
            this.player.modifyHealth(-1 * damage);
          }
        } else {
          this.player.modifyHealth(-1 * damage);
        }
      break;
      case 'Heal':
        this.enemy.modifyHealth(7);
      break;
    }

    switch (action.name) {
      case 'Attack':
        let damage = this.player.getAttackValue() - this.enemy.getDefenseValue();
        if (damage < 0) {
          damage = 1;
        }
        if (currentEncounter.enemyAction.name !== 'Block') {
          this.enemy.modifyHealth(-1 * damage);
        }
      break;

      case 'Heal':
        this.player.modifyHealth(5);
      break;

      case 'Wait':
        this.player.modifyStamina(5);
      break;
    }

    if (nextIndex === this.encounters.length) {
      this.setCombo();
      this.setupEncounter();
    }
  }

  setupEncounter(): void {
    this.encounters = [];
    this.combo.actions.forEach((action: any) => {
      this.encounters.push(new Encounter(action));
    });
    this.encounters[0].isRevealed = true;
    this.encounters[0].isActive = true;
  }

  setCombo(): void {
    let index = Math.floor(Math.random() * this.enemy.combos.length);
    this.combo = this.enemy.combos[index];
  }
}

@Component({
  template: require('./home.component.html')
})
export class HomeComponent implements OnInit {
  player: Character = new Character({
    name: 'Blasko',
    baseAttack: 5,
    baseDefense: 1,
    combos: [
      {
        actions: [
          {
            name: 'Attack',
            staminaCost: 4
          },
          {
            name: 'Block',
            staminaCost: 1
          },
          {
            name: 'Dodge',
            staminaCost: 2
          },
          {
            name: 'Heal',
            staminaCost: 0
          },
          {
            name: 'Wait',
            staminaCost: 0
          }
        ]
      }
    ]
  });
  battle: Battle;

  selectAction(index: number): void {
    let action = this.player.combos[0].actions[index];
    //this.player.combos[0].actions.splice(index, 1);
    this.battle.applyPlayerAction(action);
  }

  selectWait(): void {
    this.battle.applyPlayerAction({
      name: "Wait"
    });
  }

  ngOnInit(): void {
    let enemy = new Character({
      name: 'Undead Warrior',
      baseAttack: 4,
      baseDefense: 1,
      combos: [
        {
          actions: [
            {
              name: 'Attack'
            },
            {
              name: 'Attack'
            },
            {
              name: 'Attack'
            }
          ]
        },
        {
          actions: [
            {
              name: 'Wait'
            },
            {
              name: 'Wait'
            },
            {
              name: 'Attack'
            }
          ]
        },
        {
          actions: [
            {
              name: 'Attack'
            },
            {
              name: 'Wait'
            },
            {
              name: 'Wait'
            }
          ]
        },
        {
          actions: [
            {
              name: 'Attack'
            },
            {
              name: 'Attack'
            },
            {
              name: 'Wait'
            }
          ]
        },
        {
          actions: [
            {
              name: 'Wait'
            },
            {
              name: 'Wait'
            },
            {
              name: 'Attack'
            }
          ]
        }
      ]
    });
    this.battle = new Battle(enemy, this.player);
  }
}
