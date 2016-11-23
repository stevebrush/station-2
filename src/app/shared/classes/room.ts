import { Enemy } from './index';

export class Room {
  enemies: Enemy[];
  isExplored: boolean = false;

  constructor(enemies: Enemy[]) {
    this.enemies = enemies;
  }
}
