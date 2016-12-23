import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'station-app',
  template: require('./app.component.html')
})
export class AppComponent implements OnInit {
  private UP: number = 38;
  private DOWN: number = 40

  constructor(private titleService: Title) { }

  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): boolean {
    let keys = [this.UP, this.DOWN];
    if (keys.indexOf(event.which) > -1) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  public ngOnInit(): void {
    this.setTitle('STATION');
  }
}
