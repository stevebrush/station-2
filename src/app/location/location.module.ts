import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LocationComponent } from './location.components';
import { LocationRoutesModule } from './location-routes.module';

@NgModule({
  imports: [SharedModule, LocationRoutesModule],
  declarations: [LocationComponent]
})
export class LocationModule { }
