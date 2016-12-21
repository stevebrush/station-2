import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DepotComponent } from './depot/depot.component';
import { LanderComponent } from './lander/lander.component';
import { FactoryComponent } from './factory/factory.component';
import { LabComponent } from './lab/lab.component';
import { RoverDetailComponent } from './rover-detail/rover-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', component: LanderComponent },
      { path: 'depot', component: DepotComponent },
      { path: 'lab', component: LabComponent },
      { path: 'rover', component: RoverDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutesModule { }
