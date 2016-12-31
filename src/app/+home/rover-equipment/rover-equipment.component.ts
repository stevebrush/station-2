import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Rover } from '../../shared/classes';
import { RoverService } from '../../shared/services';

@Component({
  template: require('./rover-equipment.component.html')
})
export class RoverEquipmentComponent implements OnInit {
  rover: Rover;
  armaments: any[] = [
    {
      name: "Left Arm",
      item: {
        name: "Laser Rifle"
      }
    }
  ];

  constructor(
    private roverService: RoverService,
    private router: Router) { }

  selectArmament(armament: any): void {
    console.log("Armament selected:", armament.name);
  }

  goBack(): void {
    this.router.navigate(['home/rover']);
  }

  ngOnInit(): void {
    this.roverService.getActiveRover().then((rover) => {
      if (!rover) {
        this.router.navigate(['home']);
        return;
      }
      this.rover = rover;
    });
  }
}
