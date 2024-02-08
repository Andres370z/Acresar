import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultativosRoutingModule } from './facultativos-routing.module';
import { FacultativosComponent } from './facultativos.component';
import { MenuModule } from '../menu/menu.module';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  declarations: [
    FacultativosComponent,
  ],
  imports: [
    CommonModule,
    FacultativosRoutingModule,
    MenuModule,
    FormsModule,
    MatMenuModule,
    MatDividerModule,
    MatCheckboxModule,
    MatStepperModule
  ]
})
export class FacultativosModule { }
