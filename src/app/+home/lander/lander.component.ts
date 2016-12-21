import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { RoverService } from '../../shared/services';
import { Rover } from '../../shared/classes';

@Component({
  template: require('./lander.component.html')
})
export class LanderComponent implements OnInit, OnDestroy {

  navigationIndex: number = 0;
  selectedRover: Rover;
  rovers: Rover[] = [];
  systems: any[] = [
    {
      name: "Communications",
      description: "Locate new areas",
      status: {
        name: "FAIL",
        rating: 0
      }
    },
    {
      name: "Refinery",
      description: "Resource gathering",
      status: {
        name: "FAIL",
        rating: 0
      }
    },
    {
      name: "Fabricator",
      description: "Create components",
      status: {
        name: "FAIL",
        rating: 0
      }
    },
    {
      name: "Thermal Shield",
      description: "Improve defense rating",
      status: {
        name: "FAIL",
        rating: 0
      }
    },
    {
      name: "Thrusters",
      description: "Escape planetary gravity",
      status: {
        name: "FAIL",
        rating: 0
      }
    }
  ];

  constructor(private roverService: RoverService, private router: Router) { }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent):boolean {
    let keys = [38, 40];
    if (keys.indexOf(event.which) > -1) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  @HostListener('document:keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent):void {
    event.preventDefault();

    if (this.selectedRover) {
      return;
    }
    console.log("Keyup:", event.which);
    switch (event.which) {

      // UP
      case 38:
      this.navigationIndex--;
      if (this.navigationIndex < 0) {
        this.navigationIndex = 0;
      }
      break;

      // DOWN
      case 40:
      this.navigationIndex++;
      if (this.navigationIndex > this.rovers.length - 1) {
        this.navigationIndex = this.rovers.length - 1;
      }
      break;

      // ENTER
      case 13:
      this.selectedRover = this.rovers[this.navigationIndex];
      this.router.navigate(['home/rover']);
      break;
    }
    console.log("Navigation index:", this.navigationIndex);
  }

  public ngOnInit(): void {
    this.roverService.getAll().then((data) => {
      this.rovers = data;
    });
  }

  public ngOnDestroy(): void {
    this.roverService.activeRover = this.selectedRover;
  }
}
