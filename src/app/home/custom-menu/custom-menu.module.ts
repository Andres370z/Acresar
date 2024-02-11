import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CistomMenuRoutingModule } from './custom-menu-routing.module';
import { CistomMenuComponent } from './custom-menu.component';
import { MenuModule } from '../reinsurance-companies/menu/menu.module';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  declarations: [CistomMenuComponent],
  imports: [
    CommonModule,
    CistomMenuRoutingModule,
    MenuModule,
    FormsModule,
    MatMenuModule,
    MatDividerModule,
    MatCheckboxModule,
    MatStepperModule
  ]
})
export class CistomMenuModule { }
