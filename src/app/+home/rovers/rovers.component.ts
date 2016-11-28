import { Component, OnInit } from '@angular/core';

@Component({
  template: require('./rovers.component.html')
})
export class RoversComponent implements OnInit {
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
  
  public ngOnInit(): void {
  }
}
