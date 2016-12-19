import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LocationComponent } from './location.component';
import { LocationRoutesModule } from './location-routes.module';
import { InventoryModule } from '../inventory/inventory.module';
import { PlayerStatsModule } from '../player-stats/player-stats.module';
import { MeterModule } from '../meter/meter.module';

@NgModule({
  imports: [
    SharedModule,
    InventoryModule,
    LocationRoutesModule,
    PlayerStatsModule,
    MeterModule
  ],
  declarations: [LocationComponent]
})
export class LocationModule { }
