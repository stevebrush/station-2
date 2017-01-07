import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { KeyNavigatorModule } from '../key-navigator/key-navigator.module';
import { LocationRoutesModule } from './location-routes.module';
import { LocationComponent } from './location.component';
import { LocationMainMenuComponent } from './main-menu/location-main-menu.component';
import { EnemyComponent } from './enemy/enemy.component';

@NgModule({
  imports: [SharedModule, KeyNavigatorModule, LocationRoutesModule, KeyNavigatorModule],
  declarations: [LocationComponent, LocationMainMenuComponent, EnemyComponent]
})
export class LocationModule { }
