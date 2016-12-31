import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutesModule } from './home-routes.module';
import { PlayerStatsModule } from '../player-stats/player-stats.module';
import { InventoryModule } from '../inventory/inventory.module';
import { KeyNavigatorModule } from '../key-navigator/key-navigator.module';

import { RoversComponent } from './rovers/rovers.component';
import { RoverMenuComponent } from './rover-menu/rover-menu.component';
import { RoverEquipmentComponent } from './rover-equipment/rover-equipment.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutesModule,
    PlayerStatsModule,
    InventoryModule,
    KeyNavigatorModule
  ],
  declarations: [
    HomeComponent,
    RoversComponent,
    RoverMenuComponent,
    RoverEquipmentComponent,
    MainMenuComponent
  ]
})
export class HomeModule { }
