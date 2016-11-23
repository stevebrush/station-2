import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LocationComponent } from './location.components';
import { LocationRoutesModule } from './location-routes.module';
import { PlayerStatsModule } from '../player-stats/player-stats.module';

@NgModule({
  imports: [SharedModule, LocationRoutesModule, PlayerStatsModule],
  declarations: [LocationComponent]
})
export class LocationModule { }
