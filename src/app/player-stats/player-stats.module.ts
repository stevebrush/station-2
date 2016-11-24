import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PlayerStatsComponent } from './player-stats.component';
import { InventoryModule } from '../inventory/inventory.module';

@NgModule({
  imports: [SharedModule, InventoryModule],
  declarations: [PlayerStatsComponent],
  exports: [PlayerStatsComponent]
})
export class PlayerStatsModule { }
