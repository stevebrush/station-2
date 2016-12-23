import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LanderComponent } from './lander/lander.component';
import { RoverDetailComponent } from './rover-detail/rover-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', component: LanderComponent },
      { path: 'rover', component: RoverDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutesModule { }
