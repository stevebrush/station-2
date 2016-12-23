import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { RoverService } from '../../shared/services';
import { Rover } from '../../shared/classes';

@Component({
  template: require('./lander.component.html')
})
export class LanderComponent implements OnInit, OnDestroy {
  selectedRover: Rover;
  rovers: Rover[] = [];
  pages: any[] = [
    {
      name: "Command"
    },
    {
      name: "Lab"
    },
    {
      name: "Storage"
    }
  ];

  constructor(
    private roverService: RoverService,
    private router: Router) { }

  public visitPage(page: any) {
    console.log("Visit Page: ", page);
  }

  public selectRover(rover: Rover) {
    this.selectedRover = rover;
    this.router.navigate(['home/rover']);
  }

  public ngOnInit(): void {
    this.roverService.getAll().then((data) => {
      this.rovers = data;
    });
  }

  public ngOnDestroy(): void {
    this.roverService.setActiveRover(this.selectedRover);
  }
}
