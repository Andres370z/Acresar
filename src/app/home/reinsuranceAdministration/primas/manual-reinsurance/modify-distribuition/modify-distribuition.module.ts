import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyDistribuitionRoutingModule } from './modify-distribuition-routing.module';
import { ModifyDistribuitionComponent } from './modify-distribuition.component';

@NgModule({
  declarations: [
    ModifyDistribuitionComponent
  ],
  imports: [
    CommonModule,
    ModifyDistribuitionRoutingModule
  ]
})
export class ModifyDistribuitionModule { }
