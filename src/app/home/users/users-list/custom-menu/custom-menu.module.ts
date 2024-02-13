import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CistomMenuRoutingModule } from './custom-menu-routing.module';
import { CistomMenuComponent } from './custom-menu.component';
import { MenuModule } from '../../../reinsurance-companies/menu/menu.module';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { QRCodeModule } from 'angularx-qrcode';
import { MatCardModule } from '@angular/material/card';


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
    MatStepperModule,
    QRCodeModule,
    MatCardModule
  ]
})
export class CistomMenuModule { }
