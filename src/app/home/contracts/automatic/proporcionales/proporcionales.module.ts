import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProporcionalesRoutingModule } from './proporcionales-routing.module';
import { ProporcionalesComponent } from './proporcionales.component';


@NgModule({
  declarations: [
    ProporcionalesComponent
  ],
  imports: [
    CommonModule,
    ProporcionalesRoutingModule
  ]
})
export class ProporcionalesModule { }
