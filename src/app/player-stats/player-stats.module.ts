import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PlayerStatsComponent } from './player-stats.component';

@NgModule({
  imports: [SharedModule],
  declarations: [PlayerStatsComponent],
  exports: [PlayerStatsComponent]
})
export class PlayerStatsModule { }
