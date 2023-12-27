import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstMenuRoutingModule } from './first-menu-routing.module';
import { FirstMenuComponent } from './first-menu.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [FirstMenuComponent],
  exports: [FirstMenuComponent],
  imports: [
    CommonModule,    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FirstMenuModule { }
