import { CharacterOptions } from '../interfaces';
import { Inventory } from './inventory';

export abstract class Character {
  public attack: number;
  public defense: number;
  public health: number;
  public healthKits: number = 0;
  public id: number;
  public name: string;
  public healthMax: number;
  public inventory: Inventory;

  constructor(options: CharacterOptions) {
    if (!options.inventory) {
      options.inventory = new Inventory();
    }
    for (let k in options) {
      if (options.hasOwnProperty(k)) {
        this[k] = options[k];
      }
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
