import { Character } from '../classes/index';
import { ItemOptions } from './index';
export interface Healable {
  potency: number;
  heal(character: Character): void;
}
