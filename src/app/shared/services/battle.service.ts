import { Injectable } from '@angular/core';

@Injectable()
export class BattleService {
  private activeEnemy: any;

  constructor() { }

  public getActiveEnemy(): Promise<any> {
    if (!this.activeEnemy) {
      return Promise.resolve(null);
    }
    return Promise.resolve(this.activeEnemy);
  }

  public setActiveEnemy(enemy: any): void {
    this.activeEnemy = enemy;
  }
}
