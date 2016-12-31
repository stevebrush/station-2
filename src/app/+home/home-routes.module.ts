import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RoversComponent } from './rovers/rovers.component';
import { RoverEquipmentComponent } from './rover-equipment/rover-equipment.component';
import { RoverMenuComponent } from './rover-menu/rover-menu.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', component: MainMenuComponent },
      { path: 'rovers', component: RoversComponent },
      { path: 'rover', component: RoverMenuComponent },
      { path: 'rover-equipment', component: RoverEquipmentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutesModule { }
