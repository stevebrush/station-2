import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { KeyNavigatorComponent, KeyNavigatorItemDirective } from './key-navigator.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    KeyNavigatorComponent,
    KeyNavigatorItemDirective
  ],
  exports: [
    KeyNavigatorComponent,
    KeyNavigatorItemDirective
  ]
})
export class KeyNavigatorModule { }
