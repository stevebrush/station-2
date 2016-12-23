import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutesModule } from './home-routes.module';
import { PlayerStatsModule } from '../player-stats/player-stats.module';
import { InventoryModule } from '../inventory/inventory.module';

import { LanderComponent } from './lander/lander.component';
import { RoverDetailComponent } from './rover-detail/rover-detail.component';
import { KeyNavigatorComponent, KeyNavigatorActiveDirective } from '../shared/directives/key-navigator.directive';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutesModule,
    PlayerStatsModule,
    InventoryModule
  ],
  declarations: [
    HomeComponent,
    LanderComponent,
    RoverDetailComponent,
    KeyNavigatorComponent,
    KeyNavigatorActiveDirective
  ]
})
export class HomeModule { }
