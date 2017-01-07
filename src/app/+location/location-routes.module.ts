import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationComponent } from './location.component';
import { LocationMainMenuComponent } from './main-menu/location-main-menu.component';
import { EnemyComponent } from './enemy/enemy.component';

const routes: Routes = [
  { path: '', component: LocationComponent,
    children: [
      { path: '', component: LocationMainMenuComponent },
      { path: 'enemy', component: EnemyComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutesModule { }
