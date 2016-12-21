import { Injectable } from '@angular/core';

import { Rover } from '../classes/rover';

@Injectable()
export class RoverService {
  private rovers: Rover[] = [
    new Rover({
      id: 1,
      name: "Trinity",
      level: 24
    }),
    new Rover({
      id: 2,
      name: "Halberd",
      level: 12
    }),
    new Rover({
      id: 3,
      name: "Big Bertha",
      level: 1
    }),
    new Rover({
      id: 4,
      name: "Lexor",
      level: 1
    })
  ];
  public activeRover: Rover;

  public getAll(): Promise<Rover[]> {
    return Promise.resolve(this.rovers);
  }
}
