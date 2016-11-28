import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  template: require('./factory.component.html')
})
export class FactoryComponent implements OnInit {
  turrets: any[] = [
    {
      name: "Autocannon",
      condition: 45
    }
  ];

  public ngOnInit(): void { }
}
