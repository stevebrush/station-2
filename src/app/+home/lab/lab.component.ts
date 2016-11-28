import { Component, OnInit } from '@angular/core';

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
      cost: "4i per second",
      progress: 56
    }
  ];
  
  public ngOnInit(): void { }
}
