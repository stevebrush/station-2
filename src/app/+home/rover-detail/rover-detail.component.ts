import { Component, Input, OnInit } from '@angular/core';

import { Rover } from '../../shared/classes';
import { RoverService } from '../../shared/services';

@Component({
  selector: 'station-rover-detail',
  template: require('./rover-detail.component.html')
})
export class RoverDetailComponent implements OnInit {

  @Input()
  rover: Rover;

  constructor(private roverService: RoverService) { }

  public ngOnInit(): void {
    this.rover = this.roverService.activeRover;
  }
}
