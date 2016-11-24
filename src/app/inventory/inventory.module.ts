import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InventoryComponent } from './inventory.component';

@NgModule({
  imports: [SharedModule],
  declarations: [InventoryComponent],
  exports: [InventoryComponent]
})
export class InventoryModule { }
