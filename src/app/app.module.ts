import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutesModule } from './app-routes.module';
import { ItemService,
         LocationService,
         PlayerService,
         VesselService,
         RoverService } from './shared/services';

@NgModule({
  imports: [BrowserModule, AppRoutesModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    Title, ItemService, LocationService, PlayerService,
    VesselService, RoverService
  ]
})
export class AppModule { }
