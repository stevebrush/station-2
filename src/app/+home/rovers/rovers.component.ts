import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { RoverService } from '../../shared/services';
import { Rover } from '../../shared/classes';

@Component({
  template: require('./rovers.component.html')
})
export class RoversComponent implements OnInit, OnDestroy {
  selectedRover: Rover;
  rovers: Rover[] = [];

  constructor(
    private roverService: RoverService,
    private router: Router) { }

  goBack(): void {
    this.router.navigate(['home']);
  }

  selectRover(rover: Rover) {
    this.selectedRover = rover;
    this.router.navigate(['home/rover']);
  }

  ngOnInit(): void {
    this.roverService.getAll().then((data) => {
      this.rovers = data;
    });
  }

  ngOnDestroy(): void {
    this.roverService.setActiveRover(this.selectedRover);
  }
}
