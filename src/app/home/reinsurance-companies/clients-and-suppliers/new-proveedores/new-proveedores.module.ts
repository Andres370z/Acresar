import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewProveedoresRoutingModule } from './new-proveedores-routing.module';
import { NewProveedoresComponent } from './new-proveedores.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NewProveedoresComponent],
  imports: [
    CommonModule,
    NewProveedoresRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class NewProveedoresModule { }
