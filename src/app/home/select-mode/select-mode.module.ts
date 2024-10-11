import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectModeRoutingModule } from './select-mode-routing.module';
import { SelectModeComponent } from './select-mode.component';


@NgModule({
  declarations: [SelectModeComponent],
  imports: [
    CommonModule,
    SelectModeRoutingModule
  ]
})
export class SelectModeModule { }
