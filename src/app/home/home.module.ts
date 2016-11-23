import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutesModule } from './home-routes.module';
import { PlayerStatsModule } from '../player-stats/player-stats.module';

@NgModule({
  imports: [SharedModule, HomeRoutesModule, PlayerStatsModule],
  declarations: [HomeComponent]
})
export class HomeModule { }
