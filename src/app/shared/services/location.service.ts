import { Injectable } from '@angular/core';

import { Enemy,
         Location } from '../classes';

import { Crudable } from '../interfaces';

@Injectable()
export class LocationService implements Crudable {
  public locations: Location[] = [
    <Location>{
      id: 1,
      name: 'Red Canyon',
      percentExplored: 0,
      enemies: [
        new Enemy({
          attack: 4,
          defense: 2,
          health: 5,
          healthMax: 5,
          id: 1,
          name: 'Ogre'
        }),
        new Enemy({
          attack: 1,
          defense: 1,
          health: 2,
          healthMax: 2,
          id: 2,
          name: 'Rat'
        }),
        new Enemy({
          attack: 7,
          defense: 10,
          health: 10,
          healthMax: 10,
          id: 3,
          name: 'Croag'
        })
      ]
    }
  ];

  constructor() { }

  public getById(id: number): Promise<Location> {
    let locations = this.locations.filter(location => {
      return (location.id === id);
    });
    return Promise.resolve(locations[0]);
  }
}
