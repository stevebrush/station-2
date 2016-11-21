import { Character } from './character';
import { CharacterOptions } from '../interfaces';

export class Enemy extends Character {
  constructor(options: CharacterOptions) {
    super(options);
  }
}
