import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstMenuRoutingModule } from './first-menu-routing.module';
import { FirstMenuComponent } from './first-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [FirstMenuComponent],
  exports: [FirstMenuComponent],
  imports: [
    CommonModule,    
    MatButtonModule,
    MatMenuModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FirstMenuModule { }
