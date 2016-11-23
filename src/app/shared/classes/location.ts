import { Enemy } from './index';

interface LocationOptions {
  name: string;
  percentExplored: number;
  enemies: Enemy[];
}

export class Location {
  id: number;
  name: string;
  percentExplored: number = 0;
  enemies: Enemy[];

  constructor(options: LocationOptions) {
    for (let k in options) {
      if (options.hasOwnProperty(k)) {
        this[k] = options[k];
      }
    }
  }
}
