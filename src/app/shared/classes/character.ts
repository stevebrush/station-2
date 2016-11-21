import { CharacterOptions } from '../interfaces';

export abstract class Character {
  protected options: CharacterOptions;
  public attack: number;
  public defense: number;
  public health: number;
  public id: number;
  public name: string;
  public maxHealth: number;

  constructor(options: CharacterOptions) {
    this.options = options;
    for (let k in options) {
      if (options.hasOwnProperty(k)) {
        this[k] = options[k];
      }
    }
  }
}
