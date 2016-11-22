import { Character } from '../classes';

export interface Usable {
  readonly isUsable: boolean;
  actOn(character: Character): void;
}
