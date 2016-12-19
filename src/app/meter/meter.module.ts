import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MeterComponent } from './meter.component';

@NgModule({
  imports: [SharedModule],
  declarations: [MeterComponent],
  exports: [MeterComponent]
})
export class MeterModule { }
