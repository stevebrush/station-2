import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'station-meter',
  template: require('./meter.component.html')
})
export class MeterComponent implements OnChanges, OnInit {

  @Input() percentage: number;
  @Input() useSecondaryGuage: boolean = false;

  originalPercentage: number;
  private subscription: Subscription;

  public ngOnInit(): void {
    this.originalPercentage = this.percentage;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if ('percentage' in changes) {
      if (changes['percentage'].previousValue && !changes['percentage'].isFirstChange()) {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
        this.subscription = Observable.timer(400, 10).subscribe(() => {
            this.originalPercentage--;
            if (this.originalPercentage <= this.percentage) {
              this.originalPercentage = this.percentage;
              this.subscription.unsubscribe();
            }
          });
      }
    }
  }
}
