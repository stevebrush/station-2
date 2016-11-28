import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  template: require('./lander.component.html')
})
export class LanderComponent implements OnInit {
  countdown: number = 90;
  countdownString: string = '';
  rovers: any[] = [
    {
      name: "Mark I",
      assignment: "IDLE",
      condition: 100,
      isDeployed: false
    },
    {
      name: "Mark I",
      assignment: "IDLE",
      condition: 12,
      isDeployed: false
    },
    {
      name: "Mark II",
      assignment: "Mining Red Canyon",
      condition: 86,
      isDeployed: true
    },
    {
      name: "Mark IV",
      assignment: "Defending Station",
      condition: 54,
      isDeployed: true
    }
  ];
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

  private formatSeconds(seconds: number): string {
    let date = new Date(1970, 0, 1);
    date.setSeconds(seconds);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
  }

  public ngOnInit(): void {
    let timer = Observable.timer(0, 1000);
    timer.subscribe(t => {
      this.countdown--;
      this.countdownString = this.formatSeconds(this.countdown);
    });
  }
}
