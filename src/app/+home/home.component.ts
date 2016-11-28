import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  template: require('./home.component.html')
})
export class HomeComponent implements OnInit {
  countdown: number = 90;
  countdownString: string = '';
  totalIodyte: number = 1500;
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

  // private formatSeconds(seconds: number): string {
  //     let date = new Date(1970, 0, 1);
  //     date.setSeconds(seconds);
  //     return date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
  // }

  public ngOnInit(): void {
    // let timer = Observable.timer(0, 1000);
    // timer.subscribe(t => {
    //   this.countdown--;
    //   this.countdownString = this.formatSeconds(this.countdown);
    // });

    // setInterval(() => {
    //   this.totalIodyte--;
    //   this.resources.iodyte++;
    // }, 1000);
    // setInterval(() => {
    //   this.resources.steel += 8;
    // }, 4000);
    // setInterval(() => {
    //   this.resources.uranium += 1;
    // }, 5000);
  }
}
