import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerencialComponent } from './gerencial.component';
import { GerencialRoutingModule } from './gerencial-routing.module';
import { NegocioComponent } from './negocio/negocio.component';
import { MenuModule } from './menu/menu.module';



@NgModule({
  declarations: [GerencialComponent],
  imports: [
    CommonModule,
    GerencialRoutingModule,
    MenuModule
  ] 
})
export class GerencialModule { }
