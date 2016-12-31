import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: `
    <div class="panel">
      <h1 class="panel-title">Lander</h1>
      <div class="panel-body">
        <station-key-navigator [model]="pages" (onSelection)="visitPage($event)">
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
export class MainMenuComponent {
  pages: any[] = [
    {
      name: "Command",
      route: 'home/rovers'
    },
    {
      name: "Lab",
      route: 'home'
    },
    {
      name: "Storage",
      route: 'home'
    }
  ];

  constructor(private router: Router) {}

  visitPage(page: any) {
    this.router.navigate([page.route]);
  }
}
