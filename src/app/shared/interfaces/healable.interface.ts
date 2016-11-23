import { Character } from '../classes/index';
export interface Healable {
  potency: number;
  heal(character: Character): void;
}
