import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MenuModule } from './reinsurance-companies/menu/menu.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MenuModule,
    FormsModule
  ]
})
export class HomeModule { }
