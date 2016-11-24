import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LocationComponent } from './location.component';
import { LocationRoutesModule } from './location-routes.module';
import { InventoryModule } from '../inventory/inventory.module';
import { PlayerStatsModule } from '../player-stats/player-stats.module';

@NgModule({
  imports: [
    SharedModule,
    InventoryModule,
    LocationRoutesModule,
    PlayerStatsModule
  ],
  declarations: [LocationComponent]
})
export class LocationModule { }
