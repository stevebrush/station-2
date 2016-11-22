import { Inventory } from '../classes';

export interface CharacterOptions {
  attack: number;
  defense: number;
  health: number;
  healthKits?: number;
  healthMax: number;
  id: number;
  inventory?: Inventory;
  name: string;
}
