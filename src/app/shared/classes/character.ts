import { Inventory } from './index';

interface CharacterOptions {
  attack: number;
  defense: number;
  energy?: number;
  energyMax?: number;
  health: number;
  healthMax: number;
  id: number;
  inventory?: Inventory;
  name: string;
}


export abstract class Character {
  public attack: number;
  public defense: number;
  public energy: number = 100;
  public energyMax: number = 100;
  public health: number;
  public id: number;
  public name: string;
  public healthMax: number;
  public inventory: Inventory = new Inventory();

  constructor(options: CharacterOptions) {
    for (let k in options) {
      if (options.hasOwnProperty(k)) {
        this[k] = options[k];
      }
    }
  }

  public getEnergyPercentage(): number {
    return this.energy / this.energyMax * 100;
  }

  public getHealthPercentage(): number {
    return this.health / this.healthMax * 100;
  }

  public modifyEnergy(modifier: number): void {
    this.energy += modifier;
    if (this.energy > this.energyMax) {
      this.energy = this.energyMax;
    }
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  public modifyHealth(modifier: number): void {
    this.health += modifier;
    if (this.health > this.healthMax) {
      this.health = this.healthMax;
    }
    if (this.health < 0) {
      this.health = 0;
    }
  }
}
