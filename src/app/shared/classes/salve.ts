import { Item, Character } from './index';
import { ItemOptions, Usable, Healable } from '../interfaces';

export class Salve extends Item implements Usable, Healable {
  public isUsable: boolean = true;
  public potency: number;

  constructor(options: ItemOptions) {
    super(options);
  }

  public actOn(character: Character): void {
    this.heal(character);
  }

  public heal(character: Character): void {
    character.modifyHealth(Math.floor(character.healthMax * this.potency / 100));
  }
}
