import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutesModule } from './home-routes.module';
import { MeterModule } from '../meter/meter.module';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutesModule,
    MeterModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
