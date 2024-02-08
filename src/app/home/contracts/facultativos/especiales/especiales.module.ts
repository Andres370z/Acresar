import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialesRoutingModule } from './especiales-routing.module';
import { MenuModule } from '../../menu/menu.module';
import { EspecialesComponent } from './especiales.component';


@NgModule({
  declarations: [
    EspecialesComponent,
    
  ],
  imports: [
    CommonModule,
    EspecialesRoutingModule,
    MenuModule
  ],
})
export class EspecialesModule { }
