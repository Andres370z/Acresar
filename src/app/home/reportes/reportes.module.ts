import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesComponent } from './reportes.component';
import { MenuModule } from './menu/menu.module';
import { ReportesRoutingModule } from './reportes-routing.module';


@NgModule({
  declarations: [ReportesComponent ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    MenuModule,

    
  ]
})
export class ReportesModule { }
