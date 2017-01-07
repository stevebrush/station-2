import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Rover } from '../../shared/classes';
import { RoverService } from '../../shared/services';

@Component({
  template: `
    <div class="panel">
      <h1 class="panel-title">{{rover?.name}}</h1>
      <div class="panel-body">
        <station-key-navigator [model]="pages" (onSelection)="visitPage($event)" (onGoBack)="goBack()">
          <ul class="menu">
            <li *ngFor="let page of pages" stationKeyNavigatorItem>
              <a href>{{page.name}}</a>
            </li>
          </ul>
        </station-key-navigator>
      </div>
    </div>
  `
})
export class RoverMenuComponent {
  pages: any[] = [
    {
      name: "Deploy",
      route: 'location'
    },
    {
      name: "Equipment",
      route: 'home/rover-equipment'
    },
    {
      name: "Status",
      route: 'home/rover-status'
    }
  ];
  rover: Rover;

  constructor(
    private router: Router,
    private roverService: RoverService) { }

  visitPage(page: any) {
    this.router.navigate([page.route]);
  }

  goBack(): void {
    this.router.navigate(['home/rovers']);
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
