import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GerencialTwoRoutingModule } from './gerencial-two-routing.module';
import { GerencialTwoComponent } from './gerencial-two.component';


@NgModule({
  declarations: [GerencialTwoComponent],
  imports: [
    CommonModule,
    GerencialTwoRoutingModule
  ]
})
export class GerencialTwoModule { }
