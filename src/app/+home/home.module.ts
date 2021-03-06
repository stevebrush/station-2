import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutesModule } from './home-routes.module';
import { PlayerStatsModule } from '../player-stats/player-stats.module';

import { DepotComponent } from './depot/depot.component';
import { LanderComponent } from './lander/lander.component';
import { RoverDetailComponent } from './rover-detail/rover-detail.component';
import { FactoryComponent } from './factory/factory.component';
import { LabComponent } from './lab/lab.component';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutesModule,
    PlayerStatsModule
  ],
  declarations: [
    HomeComponent, DepotComponent, LanderComponent,
    FactoryComponent, LabComponent, RoverDetailComponent
  ]
})
export class HomeModule { }
