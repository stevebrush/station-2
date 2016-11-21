import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'station-app',
  template: require('./app.component.html')
})
export class AppComponent implements OnInit {

  constructor(private titleService: Title) { }

  public ngOnInit(): void {
    this.setTitle('STATION');
  }

  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }
}
