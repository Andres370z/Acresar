import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorredorRoutingModule } from './corredor-routing.module';
import { CorredorComponent } from './corredor.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuComponent } from '../menu/menu.component';
import { MenuModule } from '../menu/menu.module';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [CorredorComponent],
  imports: [
    CommonModule,
    CorredorRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MenuModule
  ]
})
export class CorredorModule { }
