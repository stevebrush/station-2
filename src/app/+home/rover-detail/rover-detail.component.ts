import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Rover } from '../../shared/classes';
import { RoverService } from '../../shared/services';

@Component({
  selector: 'station-rover-detail',
  template: require('./rover-detail.component.html')
})
export class RoverDetailComponent implements OnInit {
  public rover: Rover;

  constructor(
    private roverService: RoverService,
    private router: Router) { }

  public ngOnInit(): void {

    this.roverService.getActiveRover().then((rover) => {
      console.log("ROVER", rover);
      if (!rover) {
        this.router.navigate(['home']);
        return;
      }

      this.rover = rover;
    });
  }
}
