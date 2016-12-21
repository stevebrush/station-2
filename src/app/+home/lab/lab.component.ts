import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  template: require('./lab.component.html')
})
export class LabComponent implements OnInit {
  components: any[] = [
    {
      name: "Rover Repair Kit",
      description: "Use to repair a rover in the field.",
      cost: "10i/15n per second",
      progress: 87,
      isBuilding: true
    }
  ];
  isotopes: any[] = [
    {
      name: "Micro-Crystaline",
      type: "Unknown",
      secondsRemaining: 500,
      cost: {
        iodyte: 4
      }
    },
    {
      name: "Azure Lythate",
      type: "Unknown",
      secondsRemaining: 145,
      cost: {
        iodyte: 4
      }
    }
  ];
  resources: any[] = [
    {
      name: "Iodyte",
      quantity: 523
    },
    {
      name: "Nitrium",
      quantity: 243
    },
    {
      name: "Salt",
      quantity: 19
    },
  ];

  countdown: number = 90;
  countdownString: string = '';

  private formatSeconds(seconds: number): string {
    let date = new Date(1970, 0, 1);
    date.setSeconds(seconds);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
  }

  public timeRemaining(isotope: any): string {
    return this.formatSeconds(isotope.secondsRemaining);
  }

  public ngOnInit(): void {
    let timer = Observable.timer(0, 1000);
    timer.subscribe(t => {
      this.isotopes.forEach((i) => {
        i.secondsRemaining--;
      });
    });
  }
}
