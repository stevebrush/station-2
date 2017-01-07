import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutesModule } from './app-routes.module';
import { ItemService,
         PlayerService,
         VesselService,
         RoverService,
         BattleService} from './shared/services';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutesModule
  ],
  declarations: [
    AppComponent
  ],
  exports: [],
  bootstrap: [
    AppComponent
  ],
  providers: [
    Title, ItemService, PlayerService,
    VesselService, RoverService, BattleService
  ]
})
export class AppModule { }
