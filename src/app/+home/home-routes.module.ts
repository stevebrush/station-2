import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DepotComponent } from './depot/depot.component';
import { LanderComponent } from './lander/lander.component';
import { RoversComponent } from './rovers/rovers.component';
import { FactoryComponent } from './factory/factory.component';
import { LabComponent } from './lab/lab.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', component: LanderComponent },
      { path: 'depot', component: DepotComponent },
      { path: 'lab', component: LabComponent },
      { path: 'factory', component: FactoryComponent },
      { path: 'rovers', component: RoversComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutesModule { }
