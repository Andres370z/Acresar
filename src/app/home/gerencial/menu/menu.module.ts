import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MenuComponent } from './menu.component';


@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MatButtonModule,
    MatMenuModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MenuModule { }
